// import "./SideBar.css";
// import avatar from "../../assets/avatar.svg";

// function SideBar() {
//   return (
//     <div className="sidebar">
//       <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
//       <p className="sidebar__username">Terrence Tegegne</p>
//     </div>
//   );
// }

// export default SideBar;
import "./SideBar.css";
import defaultAvatar from "../../assets/avatar.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ onEditProfile, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__profile-row">
        <img
          className="sidebar__avatar"
          src={currentUser.avatar || defaultAvatar}
          alt="User avatar"
        />
        <p className="sidebar__username">{currentUser.name || "Anonymous"}</p>
      </div>

      <button className="sidebar__edit-btn" onClick={onEditProfile}>
        Change profile data
      </button>

      <button className="sidebar__logout-btn" onClick={onLogout}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;
