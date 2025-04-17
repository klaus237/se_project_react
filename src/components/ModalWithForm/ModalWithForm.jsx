import "./ModalWithForm.css";
import closeIcon from "../../assets/union.png";
function ModalWithForm({ children, buttonText, title, activeModal, onClose }) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>

        {/* <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="close" className="modal_close" />
        </button> */}
        <img
          src={closeIcon}
          alt="close"
          className="modal__close"
          onClick={onClose}
          style={{ cursor: "pointer" }}
        />

        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
