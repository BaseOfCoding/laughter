import { useState } from "react";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDoc, collection, CollectionReference, DocumentData, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { v4 as uuidV4 } from "uuid";

export function LaughterFactory({ styles, userObj }: any) {
  const [laughter, setLaughter] = useState("");
  const [media, setMedia] = useState("");
  const [portrait, setPortrait] = useState(false);
  const [sameImageSize, setSameImageSize] = useState(false);
  const userIconPath = "/icons/user_icon.png";

  const onChange = (e: any) => {
    const {
      target: { value },
    } = e;
    setLaughter(value);
  };

  const onLaugh = () => {
    let fileUrl = "";

    if (media != "") {
      const storageRef = ref(getStorage(), `${userObj.uid}/${uuidV4()}`);
      uploadString(storageRef, media, "data_url")
        .then((result) => {
          getDownloadURL(storageRef)
            .then((result) => {
              fileUrl = result;
              docAdd(fileUrl);
            })
            .catch((error) => {
              console.error("get download URL error : ", error);
            });
        })
        .catch((error) => {
          console.error("upload string error : ", error);
        });
    } else {
      docAdd(fileUrl);
    }
  };

  const onFileChange = (e: any) => {
    const {
      target: { files },
    } = e;
    const theFiles = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      }: any = finishedEvent;

      let img = new Image();
      img.src = result;
      img.onload = () => {
        if (img.width > img.height) {
          setPortrait(false);
          setSameImageSize(false);
        } else if (img.width == img.height) {
          setPortrait(false);
          setSameImageSize(true);
        } else {
          setPortrait(true);
          setSameImageSize(false);
        }
      };

      setMedia(result);
    };
    reader.readAsDataURL(theFiles);
  };

  const clearPhoto = () => {
    setMedia("");
    setPortrait(false);
    setSameImageSize(false);
  };

  const imageSizeCSS = (): string => {
    if (portrait) {
      return styles.ig_media_preview_portrait;
    } else {
      if (sameImageSize) {
        return styles.ig_media_preview_sameSize;
      } else {
        return styles.ig_media_preview_landScape;
      }
    }
  };

  const docAdd = (fileUrl: string) => {
    const laughterObj = {
      text: laughter,
      createdAt: Date.now(),
      creatorID: userObj.uid,
      photoURL: userObj.photoURL,
      displayName: userObj.displayName,
      fileUrl,
    };

    addDoc(collection(getFirestore(), "laughters"), laughterObj)
      .then((result) => {
        setLaughter("");
        setMedia("");
        setPortrait(false);
        setSameImageSize(false);
      })
      .catch((error) => {
        console.error("laughter db send error : ", error);
      });
  };

  return (
    <>
      <div className={styles.laughter_group}>
        <img className={styles.lg_user_icon} src={userObj?.photoURL ? userObj.photoURL : userIconPath} />
        <div className={styles.lg_input_group}>
          <textarea
            className={styles.lg_text_area}
            onChange={onChange}
            value={laughter}
            placeholder="오늘은 무슨 웃긴 일이 있었나요?"
            maxLength={200}
          />
          <div className={styles.lg_button_group}>
            <div className={styles.lg_media_box}>
              <label htmlFor="ig_file_images">
                <FontAwesomeIcon icon={faImages} size="1x" />
              </label>
              <input type="file" id="ig_file_images" accept="image/*" onChange={onFileChange} />
            </div>
            <button className={styles.lg_laughButton} onClick={onLaugh}>
              Laugh
            </button>
          </div>
          {media && (
            <div className={styles.lg_preview_group}>
              <h4>- Image Preview -</h4>
              <img src={media} className={imageSizeCSS()} />
              <button onClick={clearPhoto}>사진 지우기</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
