import type { TButtonProps } from "@/types";
import React from "react";
import './Button.css'

const Button: React.FC<TButtonProps> = ({ onClick, disabled }) => {
  return (
<button role="button" className="golden-button" onClick={onClick} disabled={disabled} type="button">
  <span className="golden-text">Spin</span>
</button>

  );
}

export default Button;
