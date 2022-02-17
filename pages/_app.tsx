import "../styles/globals.css";
import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useEffect, useState } from "react";
import { getAuth, User } from "firebase/auth";
import { app } from "../components/firebaseInstance";
import Router from "next/router";
config.autoAddCss = false;

interface PathItem {
  isLogin?: boolean;
  userObj?: User;
}

function MyApp({ Component, pageProps }: AppProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState<User | undefined>();
  const [newName, setNewName] = useState<string | null>();

  let pathItem: PathItem = {
    isLogin: isLogin,
    userObj: userObj,
  };

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
        setUserObj(user);
      } else {
        setIsLogin(false);
        setUserObj(undefined);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = getAuth().currentUser;
    setNewName(user?.displayName);
  };

  app;

  pathItem = {
    isLogin,
    userObj,
  };

  return (
    <>
      <Component {...pageProps} pathItem={pathItem} refreshUser={refreshUser} />
    </>
  );
}

export default MyApp;
