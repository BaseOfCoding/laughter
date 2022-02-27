import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  doc,
  DocumentData,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LaughterView } from "../components/LaughterComponent/LaughterView";
import NavMenu from "../components/Navmenu";
import Seo from "../components/Seo";
import styles from "/moduleStyles/user.module.scss";
import laughterStyles from "/moduleStyles/Laughter.module.scss";

interface SnapshotData {
  data: DocumentData;
  id: string;
}

export default function User({ pathItem, refreshUser }: any) {
  const { isLogin, userObj } = pathItem;
  const router = useRouter();
  const [myLaughters, setMyLaughters] = useState<SnapshotData[]>([]);
  const [displayEdit, setDisplayEdit] = useState(false);
  const [newDisplayName, setDisplayName] = useState(userObj?.displayName ? userObj.displayName : "웃음 유발자");

  const onLogout = () => {
    getAuth()
      .signOut()
      .then((result) => {
        router.push("/");
      })
      .catch((error) => {
        console.error("sign out error : ", error);
      });
  };

  const onChange = (e: any) => {
    const {
      target: { value },
    } = e;
    setDisplayName(value);
  };

  const displayNameChange = () => {
    if (userObj.displayName != newDisplayName) {
      updateProfile(userObj, {
        displayName: newDisplayName,
      })
        .then((result) => {
          refreshUser();
          setDisplayEdit(false);

          myLaughters.map((laugh, index) => {
            const updateLaughter = doc(getFirestore(), `laughters/${laugh.id}`);
            updateDoc(updateLaughter, {
              displayName: newDisplayName,
            })
              .then((result) => {})
              .catch((error) => {
                console.error("db displayname modify error : ", error);
              });
          });
        })
        .catch((error) => {
          console.error("displayname modify Error : ", error);
        });
    }
  };

  const photoURLChange = (e: any) => {
    // const {
    //   target: { files },
    // } = e;
    // const theFiles = files[0];
    // const reader = new FileReader();
    // reader.onloadend = (e) => {
    //   const {
    //     currentTarget: { result },
    //   }: any = e;
    //   updateProfile(userObj, {
    //     photoURL: result,
    //   })
    //     .then((result) => {
    //       refreshUser();
    //       setDisplayEdit(false);
    //     })
    //     .catch((error) => {
    //       console.error("displayname modify Error : ", error);
    //     });
    // };
    // reader.readAsDataURL(theFiles);
  };

  useEffect(() => {
    if (userObj) {
      const dbQuery = query(
        collection(getFirestore(), "laughters"),
        where("creatorID", "==", userObj.uid),
        orderBy("createdAt", "asc")
      );

      const unsubscribe = onSnapshot(dbQuery, (snapshot) => {
        const newMyLaughter = snapshot.docs.map((doc) => {
          return {
            data: doc.data(),
            id: doc.id,
          };
        });
        setMyLaughters(newMyLaughter);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [userObj]);

  return (
    <>
      {isLogin && userObj && (
        <>
          <Seo title={`USER - ${userObj.displayName ? userObj.displayName : "웃음 유발자"}`} />
          <NavMenu photoURL={userObj?.photoURL} />
          <div className={styles.group}>
            <div className={styles.displayNameBackGround}>
              <div>
                <div className={styles.displayName}>{userObj.displayName ? userObj.displayName : "웃음 유발자"}</div>
                <div className={styles.laugherQuantity}>{`${myLaughters.length} laughs`}</div>
              </div>
              <div>
                <button
                  onClick={() => {
                    setDisplayEdit((prev) => !prev);
                  }}
                  className={styles.displayName_Button}
                >
                  이름 변경하기
                </button>
                <button onClick={onLogout} className={styles.displayName_Button}>
                  로그아웃하기
                </button>
              </div>
            </div>
            {displayEdit && (
              <>
                <div className={styles.displayChange_group}>
                  <input
                    className={styles.displayChange_input}
                    value={newDisplayName}
                    type="text"
                    onChange={onChange}
                  />
                  <button className={styles.displayName_Button} onClick={displayNameChange}>
                    변경하기
                  </button>
                </div>
              </>
            )}
            <div className={styles.infos}>
              {/* <label htmlFor="user_file_images"> */}
              <img className={styles.userIcon} src={userObj.photoURL ? userObj.photoURL : "/icons/user_icon.png"} />
              {/* </label> */}
              {/* <input type="file" id="user_file_images" accept="image/*" onChange={photoURLChange} /> */}
            </div>
            <div>
              {myLaughters.map((laugh, index) => (
                <LaughterView
                  key={index}
                  data={laugh.data}
                  isOwner={false}
                  laughID={laugh.id}
                  styles={laughterStyles}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
