import { useState } from "react";
import { app } from "../components/firebaseInstance";
import Seo from "../components/Seo";
import AuthForm from "../components/AuthForm";
import SocialLogin from "../components/SocialLogin";
import indexStyle from "../moduleStyles/index.module.scss";
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
          <Seo title="로그인" />
          <div className={indexStyle.container}>
            <img className={indexStyle.icon} src="/icons/laughter_white.png" />
            <h3 className={indexStyle.loginText}>{newAccount ? "래프터에 가입하기" : "래프터에 로그인하기"}</h3>
            <AuthForm setError={setError} newAccount={newAccount} setNewAccount={setNewAccount} />
            <div className={indexStyle.socialLogin_div}>
              <div className={indexStyle.line}></div>
              <h4 className={indexStyle.socialLogin_text}>소셜 로그인하기</h4>
              <div className={indexStyle.line}></div>
            </div>
            <SocialLogin setError={setError} setNewAccount={setNewAccount} newAccount={newAccount} />
            <div className={indexStyle.errorView}>{error}</div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
