import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { faTrashCan, faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export function LaughterView({ data, isOwner, laughID, styles }: any) {
  const [editing, setEditing] = useState(false);
  const [newLaughter, setNewLaughter] = useState(data.text);
  const [newFile, setNewFile] = useState(data.fileUrl);

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

  return (
    <>
      {editing ? (
        <>
          <div className={styles.lv_group}>
            <div>
              <img className={styles.lv_user_icon} src={data.photoURL ? data.photoURL : "/icons/user_icon.png"} />
            </div>
            <div className={styles.lv_laughter_group}>
              <textarea className={styles.lv_modify_textarea} />
              {data.fileUrl && (
                <button className={styles.lv_file_button}>
                  <img className={styles.lv_file} src={data.fileUrl} />
                </button>
              )}
              {isOwner && (
                <div className={styles.lv_ownerButtons}>
                  <button onClick={onEditClick} style={{ color: "red" }} className={styles.lv_owner_button}>
                    <FontAwesomeIcon icon={faXmark} size="1x" />
                  </button>
                  <button onClick={onEditClick} style={{ color: "skyblue" }} className={styles.lv_owner_button}>
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
