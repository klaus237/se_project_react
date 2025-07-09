import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import likeDark from "../../assets/like_dark.svg";
import likeWhite from "../../assets/like_white.svg";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = item.owner.toString() === currentUser?._id;
  const isLiked = item.likes.some(
    (like) => like._id.toString() === currentUser?._id
  );

  const likeButtonClass = `card__like-btn ${
    isLiked ? "card__like-btn_active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };
  const handleLike = () => {
    onCardLike(item);
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {currentUser && (
          <button
            className="card__like-btn"
            onClick={handleLike}
            aria-label="Like item"
          >
            <img
              src={isLiked ? likeDark : likeWhite}
              alt={isLiked ? "Liked" : "Not liked"}
              className="card__like-icon"
            />
          </button>
        )}
      </div>

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl || item.link}
        alt={item.name}
      />
    </li>
  );
}
export default ItemCard;
