import type { TButtonProps } from "@/types";
import React from "react";


const Button: React.FC<TButtonProps> = ({ onClick, disabled }) => {
  return (
    <input
      type="button"
      className="start-button"
      value="Spin"
      onClick={onClick}
      disabled={disabled}
    />
  );
}

export default Button;
