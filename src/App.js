import React, { Component } from "react";
import "./App.scss";
import { Transition } from "react-transition-group";
import { VectorMap } from "react-jvectormap";

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

class App extends Component {
  state = {
    date: "",
    city: "",
    location: "",
    humidity: "",
    windSpeed: "",
    pressure: "",
    temp: "",
    info: "",
    w1: "",
    w2: "",
    w3: "",
    w4: "",
    w5: "",
    visible: false,
    in: false,
    country: ""
  };

  componentDidMount() {
    this.currentTime();
  }

  currentTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (day < 10) {
      day = `0${day}`;
    }

    if (month < 10) {
      month = `0${month}`;
    }

    this.setState({
      date: `${year}-${month}-${day}`
    });
  };

  handleEnter = e => {
    if (e.key === "Enter") {
      const images = require.context("./img/", false);

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          this.state.city
        }&appid=5620c2b78e6d891924652304a96849ac`
      )
        .then(response => response.json())
        .then(data => {
          let temp = data.main.temp - 273.15;

          this.setState({
            location: data.name,
            humidity: data.main.humidity + " %",
            windSpeed: data.wind.speed + " m/s",
            pressure: data.main.pressure + " hPa",
            temp: temp.toFixed(1) + " °C",
            src: images(`./${data.weather[0].icon}.png`),
            city: "",
            country: data.sys.country
          });

          console.log(data);

          if (temp > 27) {
            this.setState({
              w1: `It's HOT !`,
              w2: `Light clothes definitely`,
              w3: `Don't forget your sunbath creme!`,
              w4: `Some hat to prevent sunstroke`,
              w5: `Take some time off work and enjoy beautiful weather !`
            });
          } else if (temp > 18 && temp <= 27) {
            this.setState({
              w1: `It's going to be quite HOT`,
              w2: `Don't take your jacket with you`,
              w3: `Sunbath creme is not needed yet`,
              w4: `Your forehead might be sweaty, tissue will be helpful`,
              w5: `be always prepared for unexpected weather changes, umbrella is a good pick`
            });
          } else if (temp > 12 && temp <= 18) {
            this.setState({
              w1: `It's warm but don't be disappointed`,
              w2: `Light jacket is a good choice`,
              w3: `Hoodie seems to be a good pick either`,
              w4: `Don't forget to cover your ears against wind`,
              w5: `be always prepared for unexpected precipitation`
            });
          } else if (temp > 0 && temp <= 12) {
            this.setState({
              w1: `"Winter is coming !"`,
              w2: `Jacket, scarf and a head cover is a must`,
              w3: `Hoodie or sweater seems to be good good pick either`,
              w4: `Don't forget to cover your ears against wind`,
              w5: `be always prepared for unexpected precipitation`
            });
          } else if (temp <= 0) {
            this.setState({
              w1: `Winter is here, brr...`,
              w2: `Definitely thick jacket`,
              w3: `Few tons of clothes under your jacket`,
              w4: `Warm socks and boots`,
              w5: `....forget about these tips, just stay at home !`
            });
          }
        })

        .catch(() => {
          alert("Wrong city name !");
        });
    }
  };

  handleInputCity = e => {
    this.setState({
      city: e.target.value
    });
  };

  handleVisible = () => {
    this.setState({
      visible: !this.state.visible,
      in: !this.state.in
    });
  };

  render() {
    return (
      <div className="App">
        <div id="bg" />

        <div />
        <header>
          <h3>Weather's App</h3>
        </header>
        <main>
          <section
            id="card"
            className={this.state.location ? "fade-enter" : null}
            style={this.state.location ? { opacity: "1" } : { opacity: "0" }}
          >
            <label>
              <span id="location">{this.state.location}</span>
              <p id="data">{this.state.date}</p>
              <img id="icon" src={this.state.src} alt="Fetching img" />
            </label>
            <h3>
              <p>
                Temperature: <span id="temp">{this.state.temp}</span>
              </p>
              <p>
                Pressure: <span id="pressure">{this.state.pressure}</span>
              </p>
              <p>
                Humidity: <span id="humidity">{this.state.humidity}</span>
              </p>
              <p>
                Wind speed: <span id="wind-speed">{this.state.windSpeed}</span>
              </p>
            </h3>
          </section>

          <section id="primary">
            <span>
              <h1>Your personal Weather Assistant</h1>
              <input
                type="text"
                onChange={this.handleInputCity}
                onKeyPress={this.handleEnter}
                value={this.state.city}
                placeholder="enter city name"
              />
              <button
                style={
                  this.state.location ? { opacity: "1" } : { opacity: "0.75" }
                }
                disabled={!this.state.location}
                onClick={this.handleVisible}
              >
                {this.state.location ? "Get help" : "Input City"}
              </button>
            </span>
          </section>
        </main>

        <VectorMap
          map={"world_mill"}
          backgroundColor="transparent"
          zoomOnScroll={false}
          zoomButtons={false}
          containerStyle={{
            width: "100%",
            height: "40%"
          }}
          containerClassName="map"
          regionStyle={{
            initial: {
              fill: "#cccccc",
              "fill-opacity": 1,
              stroke: "none",
              "stroke-width": 0,
              "stroke-opacity": 0
            },
            hover: {
              "fill-opacity": 1,
              fill: "#e6e6ff",
              cursor: "pointer"
            },
            selected: {
              fill: "#ff0000"
            }
          }}
          selectedRegions={this.state.country}
        />

        <aside>
          <Transition in={this.state.in} timeout={0}>
            {state => (
              <div
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state]
                }}
              >
                <div
                  id="infoBox"
                  style={
                    this.state.visible
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  <ul>
                    <li id="w1">{this.state.w1}</li>
                    <li id="w2">{this.state.w2}</li>
                    <li id="w3">{this.state.w3}</li>
                    <li id="w4">{this.state.w4}</li>
                    <li id="w5">{this.state.w5}</li>
                  </ul>
                </div>
              </div>
            )}
          </Transition>
        </aside>
      </div>
    );
  }
}

export default App;
