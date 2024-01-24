import { useState } from "react";
import styles from "./input.module.scss";
import classNames from "classnames";
import Image from "next/image";

interface InputProps {
  defaultValue?: string;
  inputName: string;
  placeholderText?: string;
  label?: string;
  icon?: string;
  disabled: boolean;
  helpText?: string;
  error: boolean;
  errorText?: string;
}

export function Input({
  defaultValue,
  inputName,
  placeholderText,
  label,
  icon,
  helpText,
  errorText,
  error = false,
  disabled = false,
}: InputProps) {
  const errorOrHelpElement = () => {
    const style = error ? styles.error : styles.help;
    const text = error ? errorText : helpText;

    return <span className={style}>{text || "\n"}</span>;
  };

  const generateIcon = (icon: string, error: boolean = false) => {
    return (
      <Image
        className={error ? styles.error : styles.icon}
        src={icon}
        width={0}
        height={0}
        alt={icon}
      />
    );
  };

  const [inputValue, setInputValue] = useState(defaultValue);

  return (
    <div className={styles.inputWrapper}>
      {label && <label htmlFor={inputName}>{label}</label>}

      {icon && generateIcon(icon)}
      {error && generateIcon("/icons/alert-circle.svg", true)}

      <input
        type="text"
        name={inputValue && inputName}
        placeholder={placeholderText}
        value={inputValue}
        onChange={(elmt) => setInputValue(elmt.target.value)}
        disabled={disabled}
        className={classNames(
          error && styles.withError,
          icon && styles.withIcon,
        )}
      />

      {errorOrHelpElement()}
    </div>
  );
}
