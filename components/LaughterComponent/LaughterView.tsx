import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { faTrashCan, faPenToSquare, faXmark, faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export function LaughterView({ data, isOwner, laughID, styles }: any) {
  const [editing, setEditing] = useState(false);
  const [newLaughter, setNewLaughter] = useState("");
  const [newMedia, setNewMedia] = useState("");
  const [portrait, setPortrait] = useState(false);
  const [sameImageSize, setSameImageSize] = useState(false);

  const onDeleteClick = () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    const deleteLaughter = doc(getFirestore(), `laughters/${laughID}`);

    if (ok) {
      deleteDoc(deleteLaughter)
        .then((result) => {
          const fireStorageRef = ref(getStorage(), data.fileUrl);
          deleteObject(fireStorageRef);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const onEditClick = () => {
    setEditing((prev) => !prev);
  };

  const onEditCancelClick = () => {
    setEditing(false);
  };

  const onEditConfirm = () => {
    let ok;
    if (newMedia || newLaughter) {
      ok = window.confirm("수정 하시겠습니까?");
    }

    if (ok) {
      let object;
      if (newMedia && !newLaughter) {
        object = {
          fileUrl: newMedia,
        };
      } else if (!newMedia && newLaughter) {
        object = {
          text: newLaughter,
        };
      } else {
        object = {
          text: newLaughter,
          fileUrl: newMedia,
        };
      }

      const updateLaughter = doc(getFirestore(), `laughters/${laughID}`);
      updateDoc(updateLaughter, object)
        .then((result) => {
          setEditing(false);
          setNewMedia("");
          setNewLaughter("");
        })
        .catch((error) => {
          console.error("modify error : ", error);
        });
    }
  };

  const onLaughterChange = (e: any) => {
    const {
      target: { value },
    } = e;
    setNewLaughter(value);
  };

  const onMediaChange = (e: any) => {
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

      setNewMedia(result);
    };
    reader.readAsDataURL(theFiles);
  };

  const clearPhoto = () => {
    setNewMedia("");
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

  return (
    <>
      {editing ? (
        <>
          <div className={styles.lv_group}>
            <div>
              <img className={styles.lv_user_icon} src={data.photoURL ? data.photoURL : "/icons/user_icon.png"} />
            </div>
            <div className={styles.lv_laughter_group}>
              <textarea
                className={styles.lv_modify_textarea}
                onChange={onLaughterChange}
                value={newLaughter}
                placeholder="수정 할 내용을 입력해주세요."
                maxLength={200}
              />
              {newMedia && (
                <div className={styles.lg_preview_group}>
                  <h4>- Image Preview -</h4>
                  <img src={newMedia} className={imageSizeCSS()} />
                  <button onClick={clearPhoto}>사진 지우기</button>
                </div>
              )}
              {isOwner && (
                <div className={styles.lv_ownerButtons}>
                  <button onClick={onEditCancelClick} style={{ color: "red" }} className={styles.lv_owner_button}>
                    <FontAwesomeIcon icon={faXmark} size="1x" />
                  </button>
                  <div className={styles.lv_media_box}>
                    <label htmlFor="lv_file_images">
                      <FontAwesomeIcon icon={faImages} size="1x" />
                    </label>
                    <input type="file" id="lv_file_images" accept="image/*" onChange={onMediaChange} />
                  </div>
                  <button onClick={onEditConfirm} style={{ color: "skyblue" }} className={styles.lv_owner_button}>
                    <FontAwesomeIcon icon={faPenToSquare} size="1x" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.lv_group}>
            <div>
              <img className={styles.lv_user_icon} src={data.photoURL ? data.photoURL : "/icons/user_icon.png"} />
            </div>
            <div className={styles.lv_laughter_group}>
              <div className={styles.lv_laughter_infos}>
                <div className={styles.lv_displayName}>{data.displayName ? data.displayName : "웃음 유발자"}</div>
                <div style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>﹒</div>
                <div className={styles.lv_day}>{dayjs(data.createdAt).fromNow()}</div>
              </div>
              <div className={styles.lv_laughter}>{data.text}</div>

              {data.fileUrl && (
                <button className={styles.lv_file_button}>
                  <img className={styles.lv_file} src={data.fileUrl} />
                </button>
              )}

              {isOwner && (
                <div className={styles.lv_ownerButtons}>
                  <button onClick={onDeleteClick} style={{ color: "red" }} className={styles.lv_owner_button}>
                    <FontAwesomeIcon icon={faTrashCan} size="1x" />
                  </button>
                  <button onClick={onEditClick} style={{ color: "skyblue" }} className={styles.lv_owner_button}>
                    <FontAwesomeIcon icon={faPenToSquare} size="1x" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
