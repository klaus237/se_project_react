import "./ItemModal.css";
import closeIcon from "../../assets/union.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);

  if (!card) return null;
  const ownerId =
    card.owner && typeof card.owner === "object"
      ? card.owner._id
      : card.owner || null;
  const isOwn = currentUser && ownerId === currentUser._id;

  const itemDeleteButtonClassName = `modal__delete-btn ${
    isOwn ? "" : "modal__delete-btn_hidden"
  }`;

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <img
          src={closeIcon}
          alt="close"
          className="modal__close"
          onClick={onClose}
          style={{ cursor: "pointer" }}
        />
        <img
          src={card.imageUrl || card.link}
          alt={card.name}
          className="modal__image"
        />
        <div className="modal__footer">
          <div className="modal__header">
            <h3 className="modal__caption">{card.name}</h3>
            {/* <button
              className="modal__delete-btn"
              onClick={() => onDeleteClick(card)}
            >
              Delete item
            </button> */}
            <button
              className={itemDeleteButtonClassName}
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
