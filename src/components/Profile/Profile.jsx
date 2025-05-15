import "./Profile.css";
import SideBar from "../SideBar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ onCardClick, clothingItems, setClothingItems, onAddClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          setClothingItems={setClothingItems}
          handleAddClick={onAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
