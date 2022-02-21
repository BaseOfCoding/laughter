import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import socialLoginStyle from "../moduleStyles/SocialLogin.module.scss";

export default function SocialLogin({ setError, setNewAccount, newAccount }: any) {
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
        setError("소셜 로그인에 실패하셨습니다.");
        setTimeout(() => {
          setError("");
        }, 2000);
      });
  };

  const accountClick = () => setNewAccount((prev: any) => !prev);

  return (
    <>
      <div className={socialLoginStyle.social_buttonGroup}>
        <button className={socialLoginStyle.button} onClick={onSocialClick} name="google">
          <FontAwesomeIcon icon={faGoogle} />
          <span style={{ marginLeft: 10 }}>Continue with Google</span>
        </button>
        <button className={socialLoginStyle.button} onClick={onSocialClick} name="github">
          <FontAwesomeIcon icon={faGithub} />
          <span style={{ marginLeft: 10 }}>Continue with Github</span>
        </button>
      </div>
      <div style={{ marginTop: 10 }}>
        <span className={socialLoginStyle.account_question}>
          {newAccount ? "계정이 있으신가요?" : "계정이 없나요?"}
        </span>
        <span onClick={accountClick} className={socialLoginStyle.account_button}>
          {newAccount ? "로그인 하기" : "가입 하기"}
        </span>
      </div>
    </>
  );
}
