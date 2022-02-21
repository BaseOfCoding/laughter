import Seo from "../components/Seo";
import { addDoc, collection, DocumentData, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import NavMenu from "../components/Navmenu";
import laughterStyles from "../moduleStyles/Laughter.module.scss";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LaughterView } from "../components/LaughterView";

interface SnapshotData {
  data: DocumentData;
  id: string;
}

export default function Laughter({ pathItem }: any) {
  const { isLogin, userObj } = pathItem;
  const [laughters, setLaughters] = useState<SnapshotData[]>([]);
  const [laughter, setLaughter] = useState("");
  const [media, setMedia] = useState("");

  const onChange = (e: any) => {
    const {
      target: { value },
    } = e;
    setLaughter(value);
  };

  const onLaugh = () => {
    let fileUrl = "";

    const laughterObj = {
      text: laughter,
      createdAt: Date.now(),
      creatorID: userObj.uid,
      fileUrl,
    };

    addDoc(collection(getFirestore(), "laughters"), laughterObj)
      .then((result) => {
        setLaughter("");
      })
      .catch((error) => {
        console.error("laughter db send error : ", error);
      });
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
      setMedia(result);
    };
    reader.readAsDataURL(theFiles);
  };

  useEffect(() => {
    const setQuery = query(collection(getFirestore(), "laughters"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(setQuery, (querySnapshot) => {
      const newLaughterArr = querySnapshot.docs.map((doc) => {
        return {
          data: doc.data(),
          id: doc.id,
        };
      });
      setLaughters(newLaughterArr);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {isLogin && userObj && (
        <>
          <Seo title="Home" />
          <NavMenu photoURL={userObj?.photoURL} />
          <div className={laughterStyles.group}>
            <div className={laughterStyles.inputGroup}>
              <img
                className={laughterStyles.ig_user_icon}
                src={userObj?.photoURL ? userObj.photoURL : "/icons/user_icon.png"}
              />
              <div className={laughterStyles.ig_inputs}>
                <textarea
                  onChange={onChange}
                  value={laughter}
                  placeholder="오늘은 무슨 웃긴 일이 있었나요?"
                  maxLength={200}
                />
                <div className={laughterStyles.ig_button_group}>
                  <div className={laughterStyles.ig_media_buttons}>
                    <div className={laughterStyles.ig_media_box}>
                      <label htmlFor="ig_file_images">
                        <FontAwesomeIcon icon={faImages} size="1x" />
                      </label>
                      <input type="file" id="ig_file_images" accept="image/*" onChange={onFileChange} />
                    </div>
                  </div>
                  <button onClick={onLaugh}>Laugh</button>
                </div>
              </div>
            </div>
            <div>
              {laughters.map((laugh, index) => (
                <LaughterView
                  key={index}
                  data={laugh.data}
                  isOwner={laugh.data.creatorID == userObj.uid}
                  laughID={laugh.id}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
