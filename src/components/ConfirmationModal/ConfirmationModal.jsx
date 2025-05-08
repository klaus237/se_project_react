import "./ConfirmationModal.css";

function ConfirmationModal({ onClose, onConfirm }) {
  return (
    <div className="modal modal_opened">
      <div className="modal__content">
        <p className="modal__content__text">
          Are you sure you want to delete this item? <br /> This action is
          irreversible
        </p>

        <div className="modal__actions">
          <button className="modal__btn modal__btn_confirm" onClick={onConfirm}>
            Yes, delete it
          </button>
          <button className="modal__btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
