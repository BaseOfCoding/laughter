import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import NavMenu from "../components/Navmenu";
import Seo from "../components/Seo";

export default function User({ pathItem }: any) {
  const { isLogin, userObj } = pathItem;
  const router = useRouter();

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

  return (
    <>
      <Seo title="INFO" />
      <NavMenu photoURL={userObj?.photoURL} />
      <button onClick={onLogout}>logout</button>
    </>
  );
}
