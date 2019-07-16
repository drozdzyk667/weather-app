import React, { Component } from "react";
import "./App.scss";
import Card from "./components/card/card";
import Primary from "./components/primary/primary";
import InfoBox from "./components/infoBox/infoBox";
import { VectorMap } from "react-jvectormap";

class App extends Component {
  state = {
    date: "",
    city: "",
    location: "",
    humidity: "",
    windSpeed: "",
    pressure: "",
    temperature: "",
    message1: "",
    message2: "",
    message3: "",
    message4: "",
    message5: "",
    visible: false,
    IsAnimationStarted: false,
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

    if (month < 10) {
      month = month.toString().padStart(2, 0);
    }

    if (day < 10) {
      day = day.toString().padStart(2, 0);
    }

    this.setState({
      date: `${year}-${month}-${day}`
    });
  };

  handleEnter = event => {
    if (event.key === "Enter") {
      const images = require.context("./img/", false);

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          this.state.city
        }&appid=5620c2b78e6d891924652304a96849ac`
      )
        .then(response => response.json())
        .then(data => {
          let temperature = data.main.temp - 273.15;

          this.setState({
            location: data.name,
            humidity: data.main.humidity + " %",
            windSpeed: data.wind.speed + " m/s",
            pressure: data.main.pressure + " hPa",
            temperature: temperature.toFixed(1) + " °C",
            src: images(`./${data.weather[0].icon}.png`),
            city: "",
            country: data.sys.country
          });

          if (temperature > 27) {
            this.setState({
              message1: `It's HOT !`,
              message2: `Light clothes definitely`,
              message3: `Don't forget your sunbath creme!`,
              message4: `Some hat to prevent sunstroke`,
              message5: `Take some time off work and enjoy beautiful weather !`
            });
          } else if (temperature > 18 && temperature <= 27) {
            this.setState({
              message1: `It's going to be quite HOT`,
              message2: `Don't take your jacket with you`,
              message3: `Sunbath creme is not needed yet`,
              message4: `Your forehead might be sweaty, tissue will be helpful`,
              message5: `be always prepared for unexpected weather changes, umbrella is a good pick`
            });
          } else if (temperature > 12 && temperature <= 18) {
            this.setState({
              message1: `It's warm but don't be disappointed`,
              message2: `Light jacket is a good choice`,
              message3: `Hoodie seems to be a good pick either`,
              message4: `Don't forget to cover your ears against wind`,
              message5: `be always prepared for unexpected precipitation`
            });
          } else if (temperature > 0 && temperature <= 12) {
            this.setState({
              message1: `"Winter is coming !"`,
              message2: `Jacket, scarf and a head cover is a must`,
              message3: `Hoodie or sweater seems to be good good pick either`,
              message4: `Don't forget to cover your ears against wind`,
              message5: `be always prepared for unexpected precipitation`
            });
          } else if (temperature <= 0) {
            this.setState({
              message1: `Winter is here, brr...`,
              message2: `Definitely thick jacket`,
              message3: `Few tons of clothes under your jacket`,
              message4: `Warm socks and boots`,
              message5: `....forget about these tips, just stay at home !`
            });
          }
        })

        .catch(() => {
          alert("Wrong city name !");
        });
    }
  };

  handleInputCity = event => {
    this.setState({
      city: event.target.value
    });
  };

  handleVisible = () => {
    this.setState({
      visible: !this.state.visible,
      IsAnimationStarted: !this.state.IsAnimationStarted
    });
  };

  render() {
    return (
      <div className="App">
        <div id="bg" />

        <header>
          <h3>Weather's App</h3>
        </header>

        <main>
          <Card
            location={this.state.location}
            date={this.state.date}
            src={this.state.src}
            temperature={this.state.temperature}
            pressure={this.state.pressure}
            humidity={this.state.humidity}
            windSpeed={this.state.windSpeed}
          />
          <Primary
            handleInputCity={this.handleInputCity}
            handleEnter={this.handleEnter}
            city={this.state.city}
            location={this.state.location}
            handleVisible={this.handleVisible}
          />
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
          <InfoBox
            visible={this.state.visible}
            animationStart={this.state.IsAnimationStarted}
            message1={this.state.message1}
            message2={this.state.message2}
            message3={this.state.message3}
            message4={this.state.message4}
            message5={this.state.message5}
          />
        </aside>
      </div>
    );
  }
}

export default App;
