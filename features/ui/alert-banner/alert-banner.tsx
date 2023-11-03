import Image from "next/image";
import classNames from "classnames";
import styles from "./alert-banner.module.scss";
import { Button } from "../button";
import { capitalize } from "lodash";

export enum AlertType {
  error = "error",
}

type AlertProps = {
  message?: string;
  type?: AlertType;
  action?: () => void;
};

export function AlertBanner({
  type = AlertType.error,
  message = "There was a problem while loading the project data",
  action = () => {
    return window.location.reload();
  },
}: AlertProps) {
  return (
    <div
      data-cy={`alert-banner_${type}`}
      className={classNames(styles.alertBanner, styles[type])}
    >
      <div data-cy="message" className={styles.message}>
        <Image
          src="/icons/alert-circle.svg"
          width={20}
          height={20}
          alt={`Alert - ${type}`}
        />
        {message}
      </div>

      <div
        data-cy={`alert-banner_button${capitalize(type)}`}
        className={styles.message}
      >
        <Button onClick={action} className={styles.alertButton}>
          Try again
          <Image
            src="/icons/arrow-right.svg"
            width={20}
            height={20}
            alt={`Alert - ${type}`}
          />
        </Button>
      </div>
    </div>
  );
}
