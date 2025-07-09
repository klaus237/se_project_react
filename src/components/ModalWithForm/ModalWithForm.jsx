import "./ModalWithForm.css";
import closeIcon from "../../assets/union.png";

function ModalWithForm({
  title,
  isOpen,
  onClose,
  onSubmit,
  buttonText,
  children,
  secondaryButtonText,
  onSecondaryClick,
  isSubmitDisabled = false,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <img
          src={closeIcon}
          alt="close"
          className="modal__close"
          onClick={onClose}
          style={{ cursor: "pointer" }}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e);
          }}
          className="modal__form"
        >
          {children}
          <div className="modal__button-group">
            <button
              type="submit"
              className="modal__submit"
              disabled={isSubmitDisabled}
            >
              {buttonText}
            </button>

            {secondaryButtonText && onSecondaryClick && (
              <>
                <span className="modal__or">or</span>
                <button
                  type="button"
                  className="modal__secondary-button"
                  onClick={onSecondaryClick}
                >
                  {secondaryButtonText}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
