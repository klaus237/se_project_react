import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { defaultClothingItems } from "../../utils/constants";
import { getItems } from "../../utils/Api";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  console.log("clothingItems", clothingItems);
  //filter
  const userClothingItems = currentUser
    ? clothingItems.filter(
        (item) =>
          // handle owner = string OR object
          (typeof item.owner === "string" && item.owner === currentUser._id) ||
          (typeof item.owner === "object" && item.owner._id === currentUser._id)
      )
    : clothingItems;

  console.log("clothingItems", clothingItems);

  console.log("currentUser._id", currentUser._id);
  clothingItems.forEach((item) => console.log(item.owner));

  return (
    <div className="clothes-section">
      {handleAddClick && (
        <div className="clothes-section__header">
          <p className="clothes-section__p">Your items</p>
          <button onClick={handleAddClick} className="clothes-section__add-btn">
            + Add New
          </button>
        </div>
      )}

      <ul className="cards__list">
        {userClothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}

        {userClothingItems.length === 0 && (
          <p className="clothes-section__empty">
            You don’t have any items yet. Click “Add New” to get started.
          </p>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
