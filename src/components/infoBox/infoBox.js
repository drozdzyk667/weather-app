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
  return (
    <Transition in={props.in} timeout={0}>
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
            <ul>
              <li id="w1">{props.w1}</li>
              <li id="w2">{props.w2}</li>
              <li id="w3">{props.w3}</li>
              <li id="w4">{props.w4}</li>
              <li id="w5">{props.w5}</li>
            </ul>
          </div>
        </div>
      )}
    </Transition>
  );
};
export default InfoBox;
