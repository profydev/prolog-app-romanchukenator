import Link from "next/link";
import Image from "next/image";
import styles from "./footer.module.scss";
import { version } from "../../../package.json";

export function Footer() {
  return (
    <footer className={styles.container}>
      <div data-cy="version" className={styles.version}>
        Version: {version}
      </div>
      <div data-cy="links" className={styles.links}>
        <ul>
          <li data-cy="link">
            <Link href="#">Docs</Link>
          </li>
          <li data-cy="link">
            <Link href="#">API</Link>
          </li>
          <li data-cy="link">
            <Link href="#">Help</Link>
          </li>
          <li data-cy="link">
            <Link href="#">Community</Link>
          </li>
        </ul>
      </div>
      <div data-cy="logo" className={styles.logo}>
        <Image
          src="/icons/logo-small.svg"
          width={23}
          height={33}
          alt="Footer logo"
        />
      </div>
    </footer>
  );
}
