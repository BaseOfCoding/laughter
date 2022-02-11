import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthForm } from "../components/AuthForm";
import { app } from "../components/firebaseInstance";

function Home() {
  const onSocialClick = (e: any) => {
    const {
      target: { name },
    } = e;
    let provider: GithubAuthProvider | GoogleAuthProvider | null = null;

    if (name == "google") {
      provider = new GoogleAuthProvider();
    } else {
      provider = new GithubAuthProvider();
    }

    signInWithPopup(getAuth(), provider)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.error("social login error : ", error);
      });
  };

  app;

  return (
    <>
      <AuthForm />
      <button onClick={onSocialClick} name="google" style={{ width: 100, height: 100 }}>
        Continue with Google
      </button>
      <button onClick={onSocialClick} name="github" style={{ width: 100, height: 100 }}>
        Continue with Github
      </button>
    </>
  );
}

export default Home;
