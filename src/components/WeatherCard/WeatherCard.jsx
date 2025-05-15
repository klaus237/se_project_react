import "./WeatherCard.css";
import React, { useContext } from "react";

import { defaultWeatherOptions, weatherOptions } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  //const weatherOption = filteredOptions[0];
  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  // const weatherOptionUrl = filteredOptions[0]?.url;
  // const weatherOptionsCondition = filteredOptions[0]?.condition;
  // const weatherOptionDay = filteredOptions[0]?.day;
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {" "}
        {currentTemperatureUnit === "F"
          ? weatherData.temp.F
          : weatherData.temp.C}
        &deg; {currentTemperatureUnit}
      </p>
      <img
        src={weatherOption?.url}
        alt={`card showing ${weatherOption?.day ? "day" : "night"}time ${
          weatherOption?.condition
        } weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
