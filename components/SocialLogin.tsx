import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Link from "next/link";

export default function SocialLogin({ setError }: any) {
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
        setError("소셜 로그인에 실패하셨습니다.");
        setTimeout(() => {
          setError("");
        }, 2000);
      });
  };

  return (
    <>
      <div className="social-buttons">
        <button className="social-button" onClick={onSocialClick} name="google">
          <FontAwesomeIcon icon={faGoogle} />
          <span style={{ marginLeft: 10 }}>Continue with Google</span>
        </button>
        <button className="social-button" onClick={onSocialClick} name="github">
          <FontAwesomeIcon icon={faGithub} />
          <span style={{ marginLeft: 10 }}>Continue with Github</span>
        </button>
      </div>
      <div style={{ marginTop: 10 }}>
        <span style={{ color: "white", fontWeight: "bold", marginRight: 10 }}>계정이 없나요?</span>
        <Link href="/signup">
          <a>
            <span style={{ color: "skyblue", fontWeight: "bold" }}>가입하기</span>
          </a>
        </Link>
      </div>
      <style jsx>{`
        .social-buttons {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 80%;
        }

        .social-button {
          width: 100%;
          height: 50px;
          margin-bottom: 20px;
          border-radius: 70px;
          border: none;
          font-weight: 700;
          font-size: 16px;
          text-align: center;
        }
      `}</style>
    </>
  );
}
