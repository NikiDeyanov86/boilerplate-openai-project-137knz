const SubmitButton = ({ onClick, disabled }) => {
  return (
    <button
      type="button"
      className="submit-button"
      onClick={onClick}
      disabled={disabled}
    >
      Submit
    </button>
  );
};

export default SubmitButton;