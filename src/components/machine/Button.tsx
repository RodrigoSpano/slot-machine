
function Button({ onClick, disabled }) {
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
