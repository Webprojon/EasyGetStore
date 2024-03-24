import React from "react";
import styled from "styled-components";

// Imported Style Properties
import {
  bgColor,
  border,
  color,
  hoverBgColor,
  activeBgColor,
  stateBorder,
} from "./ButtonProperties";
// Imported Style Properties

const Button = ({
  onMouseOver,
  className,
  onClick,
  content,
  icon,
  size,
  appearance,
  disabled,
  mode,
}) => {
  return (
    <ButtonComp
      onMouseOver={onMouseOver}
      className={className}
      onClick={onClick}
      size={size}
      appearance={appearance}
      disabled={disabled ? disabled : null}
      mode={mode}
      // style={content.length > 22 ? { overflowX: "scroll" } : null}
    >
      {icon ? (
        <span>
          <img
            style={{ marginRight: icon ? ".4rem" : null }}
            src={icon}
            alt="icons"
          />
        </span>
      ) : (
        ""
      )}
      <span>{content}</span>
    </ButtonComp>
  );
};
export default Button;

const ButtonComp = styled.button`
  /* General Styles */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;

  /* Dynamic Styles */

  /* Background Color Styles */
  background-color: ${(props) =>
    bgColor[props.appearance]?.[props.mode] || "none"};

  /* Text Color Styles */
  color: ${(props) => color[props.appearance]?.[props.mode] || "none"};

  /* Border Styles */
  border: ${(props) => border[props.appearance]?.[props.mode] || "none"};

  /* Border-Radius Styles */
  border-radius: ${(props) =>
    props.size === "sm"
      ? "8px"
      : props.size === "md"
      ? "8px"
      : props.size === "lg"
      ? "12px"
      : "none"};

  /* Padding Styles */
  padding: ${(props) =>
    props.size === "sm"
      ? "5px 12px"
      : props.size === "md"
      ? "6px 12px"
      : props.size === "lg"
      ? "10px 12px"
      : null};

  &:disabled {
    opacity: 0.5;
  }

  &:hover {
    /* Background Styles */
    background-color: ${(props) =>
      hoverBgColor[props.appearance]?.[props.mode] || null};

    /* Color Styles */
    color: ${(props) =>
      props.appearance === "netural" && props.mode === "tertiary"
        ? "#37BE5D"
        : null};

    /* Border Styles */
    border: ${(props) => stateBorder[props.appearance]?.[props.mode] || null};

    /* General Styles */
    transition: all 0.2s linear;
  }

  &:active {
    /* Background Styles */
    background-color: ${(props) =>
      activeBgColor[props.appearance]?.[props.mode] || null};

    /* Color Styles */
    color: ${(props) =>
      props.appearance === "netural" && props.mode === "tertiary"
        ? "#159C3B"
        : null};

    /* Border Styles */
    border: ${(props) => stateBorder[props.appearance]?.[props.mode] || null};

    /* General Styles */
    transition: all 0.2s linear;
  }
`;
