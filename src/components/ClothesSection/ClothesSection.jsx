import { defaultClothingItems } from "../../utils/constants";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { getItems } from "../../utils/Api";

function ClothesSection({ onCardClick, clothingItems, handleAddClick }) {
  console.log("clothingItems", clothingItems);
  return (
    <div className="clothes-section">
      {handleAddClick && (
        <div>
          <p className="clotehes-section__p"> Your items</p>
          <button onClick={handleAddClick} className="clothes-section__add-btn">
            + Add New
          </button>
        </div>
      )}
      <ul className="cards__list">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
