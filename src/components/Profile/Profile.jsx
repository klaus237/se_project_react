import "./Profile.css";

import SideBar from "../SideBar/Sidebar";
import ClotheSection from "../ClotheSection/ClothesSection";

function Profile({ onCardClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__cloting-items">
        <ClotheSection onCardClick={onCardClick} />
      </section>
    </div>
  );
}

export default Profile;
