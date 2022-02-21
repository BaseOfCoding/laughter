import Link from "next/link";
import navStyle from "../moduleStyles/nav.module.scss";

export default function NavMenu({ photoURL }: any) {
  return (
    <div className={navStyle.group}>
      <Link href="/laughter">
        <a>
          <img className={navStyle.title} src="/icons/laughter_main_title_icon.png" />
        </a>
      </Link>
      <Link href="/user">
        <a>
          <img className={navStyle.userIcon} src={photoURL ? photoURL : "/icons/user_icon.png"} />
        </a>
      </Link>
    </div>
  );
}
