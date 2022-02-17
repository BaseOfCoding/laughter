import Seo from "../components/Seo";
import { collection, DocumentData, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

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
          <Seo title="래프터" />
          <div>{laughters.map((laugh, index) => {})}</div>
        </>
      )}
    </>
  );
}
