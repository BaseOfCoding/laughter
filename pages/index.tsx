import { useState } from "react";
import { app } from "../components/firebaseInstance";
import Seo from "../components/Seo";
import AuthForm from "../components/indexComponent/AuthForm";
import SocialLogin from "../components/indexComponent/SocialLogin";
import styles from "/moduleStyles/index.module.scss";
import Router from "next/router";

function Home({ pathItem }: any) {
  const [error, setError] = useState("");
  const [newAccount, setNewAccount] = useState(false);

  const loginCheck = () => {
    Router.push("/laughter");
  };

  return (
    <>
      {pathItem.isLogin ? (
        loginCheck()
      ) : (
        <>
          <Seo title="Login" />
          <div className={styles.container}>
            <img className={styles.icon} src="/icons/laughter_white.png" />
            <h3 className={styles.loginText}>{newAccount ? "래프터에 가입하기" : "래프터에 로그인하기"}</h3>
            <AuthForm setError={setError} newAccount={newAccount} setNewAccount={setNewAccount} styles={styles} />
            <div className={styles.socialLogin_div}>
              <div className={styles.line}></div>
              <h4 className={styles.socialLogin_text}>소셜 로그인하기</h4>
              <div className={styles.line}></div>
            </div>
            <SocialLogin setError={setError} setNewAccount={setNewAccount} newAccount={newAccount} styles={styles} />
            <div className={styles.errorView}>{error}</div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
