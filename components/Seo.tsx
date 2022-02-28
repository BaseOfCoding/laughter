import app from "next/app";
import Head from "next/head";

export default function Seo({ title }: any) {
  return (
    <>
      <Head>
        <title>{title} | 웃으면 복이 와요. 래프터</title>
        <link rel="icon" href="/icons/laughter_title_icon.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 user-scalable=no, maximum-scale=1, width=device-width"
        />
      </Head>
    </>
  );
}
