import Seo from "../components/Seo";
import { collection, DocumentData, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import NavMenu from "../components/Navmenu";
import styles from "/moduleStyles/Laughter.module.scss";
import { LaughterView } from "../components/LaughterComponent/LaughterView";
import { LaughterFactory } from "../components/LaughterComponent/LaughterFactory";

interface SnapshotData {
  data: DocumentData;
  id: string;
}

export default function Laughter({ pathItem }: any) {
  const { isLogin, userObj } = pathItem;
  const [laughters, setLaughters] = useState<SnapshotData[]>([]);

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
          <div className={styles.group}>
            <LaughterFactory styles={styles} userObj={userObj} />
            <div>
              {laughters.map((laugh, index) => (
                <LaughterView
                  key={index}
                  data={laugh.data}
                  isOwner={laugh.data.creatorID == userObj.uid}
                  laughID={laugh.id}
                  styles={styles}
                  userObj={userObj}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
