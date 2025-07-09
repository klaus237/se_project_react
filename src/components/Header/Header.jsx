import "./Header.css";
import logo from "../../assets/logo.svg";
import avatarPlaceholder from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onSignIn,
  onSignUp,
  onLogout,
}) {
  const currentUser = useContext(CurrentUserContext);

  const placeholderLetter = currentUser?.name
    ? currentUser.name.charAt(0).toUpperCase()
    : "?";

  const currentDate = new Date().toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="header__logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <div className="header__right-controls">
        <ToggleSwitch />
        {isLoggedIn && (
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
        )}

        {/* Connexion / Déconnexion */}
        {isLoggedIn ? (
          <>
            {/* ✅ Avatar et nom cliquables vers /profile */}
            <Link to="/profile" className="header__link">
              <div className="header__user-container">
                <p className="header__username">{currentUser?.name}</p>
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar-placeholder">
                    {placeholderLetter}
                  </div>
                )}
              </div>
            </Link>
            {/* <button onClick={onLogout} className="header__logout-btn">
              Logout
            </button> */}
          </>
        ) : (
          <div className="header__auth-buttons">
            <button
              onClick={onSignUp}
              className="header__auth-btn header__auth-btn--signup"
            >
              Sign Up
            </button>
            <button onClick={onSignIn} className="header__auth-btn">
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
