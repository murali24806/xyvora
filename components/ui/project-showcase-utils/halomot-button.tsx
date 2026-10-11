"use client";

import React, { useState } from "react";

export type HalomotButtonProps = {
  inscription: string;
  onClick?: () => void;
  fixedWidth?: string;
  fillWidth?: boolean;
  gradient?: string;
  backgroundColor?: string;
  textColor?: string;
  innerBorderRadius?: string;
  outerBorderRadius?: string;
  hoverTextColor?: string;
  href?: string;
  className?: string;
};

export const HalomotButton: React.FC<HalomotButtonProps> = ({
  inscription,
  onClick,
  fixedWidth,
  fillWidth = false,
  gradient = "linear-gradient(to right, #a123f4, #603dec)",
  backgroundColor = "#111014",
  textColor = "#fff",
  innerBorderRadius = "6px",
  outerBorderRadius = "6.34px",
  hoverTextColor,
  href,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle: React.CSSProperties = {
    borderRadius: outerBorderRadius,
    background: gradient,
    padding: "1px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    width: fillWidth ? "100%" : fixedWidth || undefined,
    border: "none",
    outline: "none",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    textDecoration: "none",
  };

  const innerStyle: React.CSSProperties = {
    borderRadius: innerBorderRadius,
    background: isHovered ? "transparent" : backgroundColor,
    color: isHovered && hoverTextColor ? hoverTextColor : textColor,
    width: "100%",
    height: "100%",
    padding: "10px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontWeight: 600,
    transition: "background 0.25s ease, color 0.25s ease",
    whiteSpace: "nowrap",
  };

  const content = (
    <span style={innerStyle}>
      {inscription}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={buttonStyle}
        className={`halomot-button group select-none active:scale-[0.98] ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      style={buttonStyle}
      className={`halomot-button group select-none active:scale-[0.98] ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default HalomotButton;
