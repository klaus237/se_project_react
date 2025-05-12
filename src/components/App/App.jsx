import { Routes, Route } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard"; // New import
import React, { useEffect, useState } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import currentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
//import { defaultClothingItems } from "../../utils/constants";
import Profile from "../Profile/Profile";
import { getItems, addItem, deleteItem } from "../../utils/Api";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [clothingItems, setClothingItems] = useState([]); //defaultClothingItems
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };

  // const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
  //   setClothingItems([{ name, link: imageUrl, weather }, ...clothingItems]); //update clothings
  //   closeActiveModal(); //close the moodal
  // };
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    handleAddItem({ name, imageUrl, weather });
    closeActiveModal();
  };

  const [showPreview, setShowPreview] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  function handleAddItem(newItem) {
    addItem(newItem)
      .then((createdItem) => {
        setClothingItems([createdItem, ...clothingItems]);
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

  return (
    <currentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  setClothingItems={setClothingItems}
                />
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
          <Footer />
        </div>
      </div>
    </currentTemperatureUnitContext.Provider>
  );
}

export default App;
