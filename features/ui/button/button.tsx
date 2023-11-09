import { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import styles from "./button.module.scss";
import Image from "next/image";

export enum Size {
  small = "small",
  medium = "medium",
  large = "large",
  xlarge = "xlarge",
}

export enum Color {
  primary = "primary",
  secondary = "secondary",
  gray = "gray",
  empty = "empty",
  emptyGray = "emptyGray",
  error = "error",
}

export interface ButtonIcon {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size;
  color?: Color;
  disabled?: boolean;
  iconLeft?: ButtonIcon;
  iconRight?: ButtonIcon;
  label?: string;
  noStyles?: boolean;
}

export function Button({
  size = Size.medium,
  color = Color.primary,
  disabled = false,
  iconLeft = { src: "", width: 0, height: 0, alt: "" },
  iconRight = { src: "", width: 0, height: 0, alt: "" },
  label = "",
  noStyles = false,
  children,
  ...buttonProps
}: ButtonProps) {
  const classes = noStyles
    ? classNames(styles.button, buttonProps.className)
    : classNames(
        styles.button,
        buttonProps.className,
        styles[size],
        styles[color],
        label ? "" : styles[`${size}-noText`],
      );

  return (
    <button {...buttonProps} className={classes} disabled={disabled}>
      {iconLeft.src && (
        <Image
          src={iconLeft.src}
          width={iconLeft.width}
          height={iconLeft.height}
          alt={iconLeft.alt}
        />
      )}

      {label}
      {children}

      {iconRight.src && (
        <Image
          src={iconRight.src}
          width={iconRight.width}
          height={iconRight.height}
          alt={iconRight.alt}
        />
      )}
    </button>
  );
}
