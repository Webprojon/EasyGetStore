import React, { useState, forwardRef } from "react";
import cn from "classnames";
import styles from "../../assets/styles/block/_input.module.scss";
import { errorIcon } from "../../assets/images/image";

const Input = forwardRef(
    (
        {
            className,
            type,
            appearance,
            error,
            placeholderType = "visible",
            placeholder,
            icon,
            required,
            disabled,
            value,
            ...props
        },
        ref
    ) => {
        const [isFocus, setIsFocus] = useState(false);
        const [newValue, setNewValue] = useState(value);

        const handleFocus = () => {
            setIsFocus(true);
        };

        const handleBlur = () => {
            setIsFocus(false);
        };

        const handleChange = (evt) => {
            setNewValue(evt.target.value);
        };

        return (
            <>
                <label
                    className={cn(
                        styles.label,
                        className,
                        styles[`label--${type}`],
                        {
                            [styles["label--focus"]]: isFocus,
                            [styles["label--placeholder"]]: placeholder,
                            [styles["label--disabled"]]: disabled,
                            [styles["label--error"]]: error,
                        }
                    )}
                >
                    {icon && (
                        <span
                            className={cn(styles.icon, styles[`icon--${type}`])}
                        >
                            <img src={icon} alt="Icon" />
                        </span>
                    )}

                    <div className={cn(styles.label__inner)}>
                        {placeholder &&
                            (placeholderType === "hidden" ? (
                                !newValue && (
                                    <span
                                        className={cn(
                                            styles.placeholder,
                                            styles["placeholder--hidden"]
                                        )}
                                    >
                                        {placeholder}
                                        {required && (
                                            <span
                                                className={cn(styles.required)}
                                            >
                                                {" "}
                                                *
                                            </span>
                                        )}
                                    </span>
                                )
                            ) : (
                                <span
                                    className={cn(styles.placeholder, {
                                        [styles["placeholder--value"]]:
                                            newValue,
                                        [styles["placeholder--focus"]]: isFocus,
                                    })}
                                >
                                    {placeholder}
                                    {required && (
                                        <span className={cn(styles.required)}>
                                            {" "}
                                            *
                                        </span>
                                    )}
                                </span>
                            ))}

                        <input
                            className={cn(styles.input, {
                                [styles["input--placeholder"]]: placeholder,
                                [styles["input--error"]]: error,
                            })}
                            type={type}
                            ref={ref}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            disabled={disabled}
                            value={newValue}
                            {...props}
                        />
                    </div>
                </label>

                {error && (
                    <div className={cn(styles.input__error)}>
                        <img
                            className={cn(styles["input__error-icon"])}
                            src={errorIcon}
                            alt="Ic-error-icon"
                        />
                        <p className={cn([styles["input__error-text"]])}>
                            {error}
                        </p>
                    </div>
                )}
            </>
        );
    }
);

export default Input;
