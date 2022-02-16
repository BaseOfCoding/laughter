import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default function AuthForm({ setError }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e: any) => {
    const {
      target: { name, value },
    } = e;
    if (name == "email") {
      setEmail(value);
    } else if (name == "password") {
      setPassword(value);
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(getAuth(), email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        setError("아이디 또는 비밀번호를 확인해주세요.");
        setTimeout(() => {
          setError("");
        }, 2000);
      });
  };

  return (
    <>
      <form onSubmit={onSubmit} className="inputs">
        <input
          className="signin-input"
          name="email"
          type="email"
          placeholder="이메일을 입력하세요."
          required
          value={email}
          onChange={onChange}
        />
        <input
          className="signin-input"
          name="password"
          type="password"
          placeholder="패스워드를 입력하세요."
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value="로그인" className="authSubmit" style={{ cursor: "pointer" }} />
      </form>
      <style jsx>{`
        .inputs {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .signin-input {
          width: 80%;
          height: 40px;
          margin-bottom: 5px;
        }

        .authSubmit {
          width: 80%;
          height: 50px;
          margin-top: 15px;
          margin-bottom: 15px;
          border-radius: 70px;
          border: none;
          font-weight: 700;
          font-size: 16px;
        }
      `}</style>
    </>
  );
}
