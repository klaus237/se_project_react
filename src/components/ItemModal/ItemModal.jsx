import "./ItemModal.css";
import closeIcon from "../../assets/union.png";
function ItemModal({ activeModal, onClose, card, onDeleteClick }) {
  if (!card) return null;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        {/* <button onClick={onClose} type="button" className="modal__close">
          CLOSE
        </button> */}
        <img
          src={closeIcon}
          alt="close"
          className="modal__close"
          onClick={onClose}
          style={{ cursor: "pointer" }}
        />
        <img
          src={card.imageUrl ? card.imageUrl : card.link}
          alt={card.name}
          className="modal__image"
        />
        <div className="modal__footer">
          <div className="modal__header">
            <h3 className="modal__caption">{card.name}</h3>
            <button
              className="modal__delete-btn"
              onClick={() => onDeleteClick(card)}
            >
              Delete item
            </button>
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
