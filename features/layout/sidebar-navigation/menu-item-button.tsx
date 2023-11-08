import React from "react";
import { Button, Color } from "@features/ui";
import classNames from "classnames";
import styles from "./menu-item-link.module.scss";

type MenuItemProps = {
  className?: string;
  text: string;
  iconSrc: string;
  onClick: () => void;
  isCollapsed: boolean;
};

export function MenuItemButton({
  className,
  text,
  onClick,
  iconSrc,
  isCollapsed,
}: MenuItemProps) {
  return (
    <li className={classNames(styles.listItem, className)}>
      <Button
        className={styles.anchor}
        onClick={onClick}
        iconLeft={{ src: iconSrc, width: 20, height: 20, alt: `${text} icon` }}
        color={Color.empty}
        noStyles={true}
      >
        {isCollapsed ? "" : text}
      </Button>
    </li>
  );
}
