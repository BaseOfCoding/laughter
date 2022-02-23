import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default function AuthForm({ setError, newAccount, setNewAccount, styles }: any) {
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

    if (newAccount) {
      createUserWithEmailAndPassword(getAuth(), email, password)
        .then((result) => {
          setNewAccount(false);
        })
        .catch((error) => {
          setError("회원가입에 실패하였습니다.");
          setTimeout(() => {
            setError("");
          }, 2000);
        });
    } else {
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
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className={styles.inputGroup}>
        <input
          className={styles.input}
          name="email"
          type="email"
          placeholder="이메일을 입력하세요."
          required
          value={email}
          onChange={onChange}
        />
        <input
          className={styles.input}
          name="password"
          type="password"
          placeholder="패스워드를 입력하세요."
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "가입하기" : "로그인"}
          className={styles.submit}
          style={{ cursor: "pointer" }}
        />
      </form>
    </>
  );
}
