import React from "react";
import "./infoBox.scss";
import { Transition } from "react-transition-group";

const duration = 700;

const defaultStyle = {
  transition: `left ${duration}ms linear`,
  position: "absolute",
  top: "61%"
};

const transitionStyles = {
  entering: { left: "0", opacity: "0" },
  entered: { left: "62%", opacity: "1" }
};

const InfoBox = props => {
  let messages = [
    { id: 1, name: props.message1 },
    { id: 2, name: props.message2 },
    { id: 3, name: props.message3 },
    { id: 4, name: props.message4 },
    { id: 5, name: props.message5 }
  ];

  const listItems = messages.map(message => (
    <li key={message.id}>{message.name}</li>
  ));

  return (
    <Transition in={props.animationStart} timeout={0}>
      {state => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}
        >
          <div
            id="infoBox"
            style={props.visible ? { display: "block" } : { display: "none" }}
          >
            <ul>{listItems}</ul>
          </div>
        </div>
      )}
    </Transition>
  );
};
export default InfoBox;
