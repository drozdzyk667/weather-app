import React from "react";
import "./card.scss";

const Card = props => {
  return (
    <section
      id="card"
      className={props.location ? "fade-enter" : null}
      style={props.location ? { opacity: "1" } : { opacity: "0" }}
    >
      <label>
        <span id="location">{props.location}</span>
        <p id="data">{props.date}</p>
        <img id="icon" src={props.src} alt="Fetching img" />
      </label>
      <h3>
        <p>
          Temperature: <span id="temp">{props.temp}</span>
        </p>
        <p>
          Pressure: <span id="pressure">{props.pressure}</span>
        </p>
        <p>
          Humidity: <span id="humidity">{props.humidity}</span>
        </p>
        <p>
          Wind speed: <span id="wind-speed">{props.windSpeed}</span>
        </p>
      </h3>
    </section>
  );
};
export default Card;
