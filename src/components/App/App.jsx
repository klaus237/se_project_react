import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import {
  getItems,
  addItem,
  deleteItem,
  updateUserInfo,
  addCardLike,
  removeCardLike,
} from "../../utils/Api";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { signup, signin, checkToken } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const navigate = useNavigate();
  //weather
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [clothingItems, setClothingItems] = useState([]); //defaultClothingItems
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  //Authentification
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleEditProfile = () => {
    setActiveModal("edit-profile");
  };
  //register new user
  const handleRegister = ({ name, avatar, email, password }) => {
    signup({ name, avatar, email, password })
      .then(() => handleLogin({ email, password })) // auto login après inscription
      .catch((err) => console.error("Erreur inscription:", err));
  };

  //connect user
  const handleLogin = ({ email, password }) => {
    signin({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        checkToken(data.token).then((user) => {
          setCurrentUser(user || null);
          closeActiveModal();
          navigate("/profile");
        });
      })
      .catch((err) => console.error("Erreur connexion:", err));
  };

  const handleUpdateUser = ({ name, avatar }) => {
    updateUserInfo({ name, avatar })
      .then((newUser) => {
        setCurrentUser(newUser);
        closeActiveModal();
      })
      .catch((err) => console.error(err));
  };

  //signOut
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const handleAddClick = () => {
    if (!isLoggedIn) {
      setActiveModal("login");
    } else {
      setActiveModal("add-garment");
    }
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    handleAddItem({ name, imageUrl, weather });
  };

  const [showPreview, setShowPreview] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  function handleAddItem(newItem) {
    addItem(newItem)
      .then((createdItem) => {
        setClothingItems([createdItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => console.error("Failed to add item:", err));
  }
  function handleDeleteClick(card) {
    setSelectedCard(card);
    setShowPreview(false);
    setShowConfirmDelete(true);
  }

  function handleConfirmDelete() {
    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== selectedCard._id)
        );
        setShowConfirmDelete(false);
        setSelectedCard(null);
      })
      .catch((err) => {
        console.error("Failed to delete item:", err);
      });
  }

  const handleCardLike = ({ _id, likes }) => {
    const token = localStorage.getItem("jwt");
    if (!token || !currentUser) return;

    const isLiked = likes.some((likeUser) => {
      // Si likeUser est un objet, comparer _id, sinon comparer directement
      if (typeof likeUser === "object" && likeUser._id) {
        return likeUser._id.toString() === currentUser._id;
      }
      return likeUser.toString() === currentUser._id;
    });

    if (!isLiked) {
      addCardLike(_id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          );
        })
        .catch((err) => console.error(err));
    } else {
      removeCardLike(_id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          );
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        // setWeatherData({...weatherData, })
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log("d", data);
        //set the clothing items
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  // check token
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token invalide:", err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);
  useEffect(() => {
    const openRegisterListener = () => setActiveModal("register");
    const openLoginListener = () => setActiveModal("login");

    window.addEventListener("open-register-modal", openRegisterListener);
    window.addEventListener("open-login-modal", openLoginListener);

    return () => {
      window.removeEventListener("open-register-modal", openRegisterListener);
      window.removeEventListener("open-login-modal", openLoginListener);
    };
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              onSignUp={() => setActiveModal("register")}
              onSignIn={() => setActiveModal("login")}
              onLogout={handleLogout}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      setClothingItems={setClothingItems}
                      onAddClick={handleAddClick}
                      onEditProfile={handleEditProfile}
                      onLogout={handleLogout}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onClose={closeActiveModal}
              onAddItemModalSubmit={handleAddItemModalSubmit}
            />
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
              onDeleteClick={handleDeleteClick}
            />
            {showConfirmDelete && (
              <ConfirmationModal
                onClose={() => setShowConfirmDelete(false)}
                onConfirm={handleConfirmDelete}
              />
            )}

            {/* Modals pour Register et Login */}
            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={closeActiveModal}
              onRegister={handleRegister}
            />
            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              onLogin={handleLogin}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={closeActiveModal}
              onUpdateUser={handleUpdateUser}
            />

            <Footer />
          </div>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
