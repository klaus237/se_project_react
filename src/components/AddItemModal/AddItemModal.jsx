import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";
import React, { useState, useEffect } from "react";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");
  const [urlTouched, setUrlTouched] = useState(false);

  const nameIsValid = name.trim().length > 0;
  const imageUrlIsValid = /^https?:\/\/.+\..+/.test(imageUrl);
  const weatherIsValid = weather !== "";

  const isFormValid = nameIsValid && imageUrlIsValid && weatherIsValid;
  const urlError = urlTouched && !imageUrlIsValid;

  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
      setUrlTouched(false);
    }
  }, [isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
    if (!urlTouched) setUrlTouched(true);
  };
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({ name, imageUrl, weather });
    // setName("");
    // setImageUrl("");
    // setWeather("");
  };
  return (
    <ModalWithForm
      title="New garment"
      ss
      buttonText="Add garment"
      name="new-card"
      // activeModal={activeModal}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isFormValid}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          // className="modal__input"
          className={`modal__input ${
            !nameIsValid && name ? "modal__input_invalid" : ""
          }`}
          id="name"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          // className="modal__input"
          className={`modal__input ${urlError ? "modal__input_error" : ""}`}
          id="imageUrl"
          placeholder="imageUrl"
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
        {urlError && (
          <span className="modal__error">
            Enter a valid URL starting with http:// or https://
          </span>
        )}
      </label>
      <fieldset className="modal__ratio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            name="weather"
            type="radio"
            className="modal__radio-input"
            onChange={handleWeatherChange}
            value="hot"
            checked={weather === "hot"}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            name="weather"
            type="radio"
            className="modal__radio-input"
            value="warm"
            onChange={handleWeatherChange}
            checked={weather === "warm"}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            name="weather"
            type="radio"
            className="modal__radio-input"
            value="cold"
            onChange={handleWeatherChange}
            checked={weather === "cold"}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
