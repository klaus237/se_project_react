import "./Profile.css";
import React, { useState } from "react";
import SideBar from "../SideBar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
import AddItemModal from "../AddItemModal/AddItemModal";

function Profile({ onCardClick, clothingItems, setClothingItems }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__cloting-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          setClothingItems={setClothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
      <AddItemModal
        isOpen={isModalOpen}
        onClose={closeModal} // Ferme le modal
        onAddItemModalSubmit={(item) => {
          // Si vous voulez gérer l'ajout d'un vêtement, passez une fonction pour l'ajouter ici
          setClothingItems([item, ...clothingItems]);
          closeModal(); // Ferme le modal après l'ajout
        }}
      />
    </div>
  );
}

export default Profile;
