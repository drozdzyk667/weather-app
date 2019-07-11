import React from "react";
import "./primary.scss";

const Primary = props => {
  return (
    <section id="primary">
      <span>
        <h1>Your personal Weather Assistant</h1>
        <input
          type="text"
          onChange={props.handleInputCity}
          onKeyPress={props.handleEnter}
          value={props.city}
          placeholder="enter city name"
        />
        <button
          style={props.location ? { opacity: "1" } : { opacity: "0.75" }}
          disabled={!props.location}
          onClick={props.handleVisible}
        >
          {props.location ? "Get help" : "Input City"}
        </button>
      </span>
    </section>
  );
};

export default Primary;
