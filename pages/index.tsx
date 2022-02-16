import { useState } from "react";
import { app } from "../components/firebaseInstance";
import Seo from "../components/Seo";
import AuthForm from "../components/AuthForm";
import SocialLogin from "../components/SocialLogin";

function Home() {
  const [error, setError] = useState("");

  app;

  return (
    <>
      <Seo title="로그인" />
      <div className="container">
        <img className="icon" src="/icons/laughter_white.png" />
        <h3 style={{ color: "white" }}>래프터에 로그인하기</h3>
        <AuthForm setError={setError} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "80%" }}>
          <div className="line"></div>
          <h4 style={{ color: "white", width: "30%", textAlign: "center" }}>소셜 로그인하기</h4>
          <div className="line"></div>
        </div>
        <SocialLogin setError={setError} />
        <div style={{ color: "#E3242B", textAlign: "center", marginTop: 10 }}>{error}</div>
      </div>

      <style jsx>{`
        .container {
          position: relative;
          left: 50vw;
          top: 50vh;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 700px;
          border-radius: 3%;
          background-color: black;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .icon {
          width: 10%;
          height: 10%;
          margin-top: 100px;
          margin-bottom: 20px;
        }

        .line {
          background-color: white;
          width: 35%;
          height: 1px;
          display: inline-block;
          opacity: 0.2;
        }
      `}</style>
    </>
  );
}

export default Home;
