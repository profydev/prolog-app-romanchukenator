import Image from "next/image";
import styles from "./loading-spinner.module.scss";

export function LoadingSpinner() {
  return (
    <div data-cy="loading-spinner" className={styles.loadingSpinner}>
      <Image
        src="/icons/loading-spinner.svg"
        width={64}
        height={64}
        alt="Loading spinner image"
      />
    </div>
  );
}
