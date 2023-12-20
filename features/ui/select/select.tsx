import { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import styles from "./select.module.scss";
import Image from "next/image";

export interface SelectOption {
  value: string;
  label?: string;
  icon?: string;
}

interface SelectProps {
  label?: string;
  name: string;
  defaultOption?: SelectOption;
  options: SelectOption[];
  placeholderText?: string;
  help?: string;
  errorText?: string;
  disabled?: boolean;
}

export function Select({
  label,
  name,
  defaultOption,
  options = [],
  placeholderText = "Please choose an option",
  help = "",
  errorText = "",
  disabled = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputOption, setInputOption] = useState(defaultOption);
  const [highlightedOptionIndex, setHighlightedOptionIndex] = useState(
    defaultOption ? options.findIndex((e) => e == defaultOption) : 0,
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const keyboardKeyTypes = {
    nav: ["Up", "ArrowUp", "Down", "ArrowDown"],
    select: [" ", "Enter"],
    tab: ["Tab"],
  };

  useEffect(() => {
    isFocused && addListeners();

    scrollOptionIntoView();

    return () => removeListeners();

    // Ugh. If there's a better way, please advise!
    // eslint-disable-next-line
  }, [isFocused, isOpen, highlightedOptionIndex]);

  const scrollOptionIntoView = () => {
    dropdownRef?.current?.children[highlightedOptionIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  const addListeners = () => {
    document.addEventListener("mousedown", clickedOutsideElement);
    document.addEventListener("keydown", handleKeyDownEvent);
  };

  const removeListeners = () => {
    document.removeEventListener("mousedown", clickedOutsideElement);
    document.removeEventListener("keydown", handleKeyDownEvent);
  };

  const isKeyboardNavKey = (key: string) => {
    return keyboardKeyTypes.nav.includes(key);
  };

  const isKeyboardSelectKey = (key: string) => {
    return keyboardKeyTypes.select.includes(key);
  };

  const isKeyboardTabKey = (key: string) => {
    return keyboardKeyTypes.tab.includes(key);
  };

  const handleOptionSelect = () => {
    setInputOption(options[highlightedOptionIndex]);
    setIsOpen(false);
  };

  const clickedOutsideElement = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const didNotClickedOnInput = !inputRef?.current?.contains(target);
    const didNotClickedOnDropdown = !dropdownRef?.current?.contains(target);

    didNotClickedOnDropdown && didNotClickedOnInput && setIsOpen(false);
  };

  const handleKeyDownEvent = (event: KeyboardEvent) => {
    const key = event.key;

    isKeyboardTabKey(key) && setIsOpen(false);

    if (isOpen) {
      event.preventDefault();
      isKeyboardSelectKey(key) && handleOptionSelect();
      isKeyboardNavKey(key) && handleKeyboardNav(key);
    } else if (isKeyboardNavKey(key) || isKeyboardSelectKey(key)) {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  const handleKeyboardNav = (key: string) => {
    const index = highlightedOptionIndex;
    const shouldIncrease: boolean = ["Down", "ArrowDown"].includes(key);

    let newIndex: number = highlightedOptionIndex;

    if (shouldIncrease && index < options.length - 1) {
      newIndex = index + 1;
    } else if (index > 0 && !shouldIncrease) {
      newIndex = index - 1;
    }

    setHighlightedOptionIndex(newIndex);
  };

  const errorOrHelpElement = () => {
    const style = errorText ? styles.error : styles.help;

    return <span className={style}>{errorText || help || "\n"}</span>;
  };

  const generateIcon = (iconUrl: string) => {
    return (
      <Image
        className={styles.icon}
        src={iconUrl}
        width={0}
        height={0}
        alt={iconUrl}
      />
    );
  };

  return (
    <div
      className={classNames(styles.selectWrapper, disabled && styles.disabled)}
    >
      {label && <label htmlFor={name}>{label}</label>}
      <div
        className={classNames(styles.inputWrapper, isOpen && styles.open)}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onFocus={() => !disabled && setIsFocused(true)}
        onBlur={() => !disabled && setIsFocused(false)}
        role="combobox"
        aria-controls={name}
        aria-expanded={isOpen}
        aria-owns={name}
        aria-haspopup="listbox"
      >
        {inputOption?.icon && generateIcon(inputOption.icon)}

        <input
          disabled={disabled}
          type="text"
          className={classNames(
            errorText && styles.error,
            inputOption?.icon && styles.withIcon,
          )}
          value={inputOption?.label || inputOption?.value || ""}
          placeholder={placeholderText}
          onChange={() => {}}
          autoComplete="false"
          aria-labelledby={name}
          aria-controls={name}
          aria-activedescendant={inputOption?.value}
          ref={inputRef}
        />
        <input
          disabled={disabled}
          type="hidden"
          id={name}
          name={name}
          value={inputOption?.value || ""}
          onChange={() => {}}
        />
      </div>

      {errorOrHelpElement()}

      {isOpen && (
        <ul
          ref={dropdownRef}
          className={styles.dropdown}
          style={{ maxHeight: 200 }}
          tabIndex={-1}
          role="listbox"
          aria-multiselectable={false}
        >
          {options?.map((option, index) => {
            return (
              <li
                id={option.value}
                role="option"
                aria-selected={option == inputOption ? "true" : "false"}
                key={index}
                onClick={() => handleOptionSelect()}
                onMouseOver={() => setHighlightedOptionIndex(index)}
                className={classNames(
                  option == inputOption ? styles.selected : "",
                  index == highlightedOptionIndex ? styles.highlighted : "",
                  option.icon && styles.withIcon,
                )}
              >
                {option.icon && generateIcon(option.icon)}
                {option.label || option.value}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
