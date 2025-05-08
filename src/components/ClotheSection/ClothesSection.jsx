import { defaultClothingItems } from "../../utils/constants";
import "./ClotheSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { getItems } from "../../utils/Api";
import { useState, useEffect } from "react";

function ClotheSection({ onCardClick }) {
  const [clothingItems, setClothingItems] = useState([]);
  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => {
        console.error("Failed to load items:", err);
      });
  }, []);

  return (
    <div className="clothes-section">
      <div>
        <p className="clotehes-section__p"> Your items</p>
        <button> + Add New </button>
      </div>
      {/* <ul className="cards__list">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul> */}
      <ul className="cards__list">
        {defaultClothingItems.map((filteredCard) => {
          return (
            <ItemCard
              key={filteredCard._id}
              item={filteredCard}
              onCardClick={onCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClotheSection;
