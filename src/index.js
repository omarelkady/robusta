import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.css';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {

  constructor() {
    super();
    this.state = {
      date: '',
      temperature: '',
      apparentTemperature: '',
      dewPoint: '',
      summary: '',
      hourlyForecast: [],
      dailyForecast: [],
      hourlyTemperature: '',
      switchToCelcius: false
    };
    this.changeTemp = this.changeTemp.bind(this)
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      const API_KEY = 'a177f8481c31fa96c3f95ad4f4f84610';

      axios.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' + API_KEY + '/' + latitude + ',' + longitude)
        .then((res) => {
          console.log("res ", res)
          var hourlyForecast = res.data.hourly.data;
          var data = res.data.currently;
          var temperature = Math.round(data.temperature);
          var apparentTemperature = Math.round(data.apparentTemperature);
          var dewPoint = Math.round(data.dewPoint);
          var summary = data.summary;
          var dailyForecast = res.data.daily.data;
          this.setState({ hourlyForecast: hourlyForecast, dailyForecast: dailyForecast, temperature: temperature, apparentTemperature: apparentTemperature, dewPoint: dewPoint, summary: summary })
          // this.getHourlyForecast();
        })
        .catch((error) => {
          console.log(error)
        })
    })
    this.getCurrentDate();

  }

  getCurrentDate() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.toLocaleString('default', { month: 'long' })) + '-' + today.getDate();
    this.setState({ date: date })
  }

  celciusToFehrenheit(celcius) {
    return Math.round(celcius * 9/5 + 32)
  }

  fehrenheitToCelcius(fehrenheit) {
    var conversion = Math.round(fehrenheit - 32)
    return Math.round(conversion * 5/9)
  }

  changeTemp(){
    if(this.state.switchToCelcius === false) {
      this.setState({ temperature: this.fehrenheitToCelcius(this.state.temperature) })
      this.setState({ apparentTemperature: this.fehrenheitToCelcius(this.state.apparentTemperature) })
      this.setState({ dewPoint: this.fehrenheitToCelcius(this.state.dewPoint) })  
      this.setState({ switchToCelcius: true })
    }
    if(this.state.switchToCelcius === true) {
      this.setState({ temperature: this.celciusToFehrenheit(this.state.temperature) })
      this.setState({ apparentTemperature: this.celciusToFehrenheit(this.state.apparentTemperature) })
      this.setState({ dewPoint: this.celciusToFehrenheit(this.state.dewPoint) })
      this.setState({ switchToCelcius: false })
    }
  }

  render() {
    return (
      <div class="container">
        <div class="header">
          <div class="logo">
            INSTAWEATHER
          </div>
          <div class="toggle">
            <label class="switch">
              <input onClick={() => this.changeTemp()} value={this.state.switchToCelcius} type="checkbox" id="togBtn" />
              <div class="slider round">
                <span class="on" value="F">F°</span>
                <span class="off" value="C">C°</span>
              </div>
            </label>
          </div>
        </div>

        <div class="row">
          <div class="col-8">
            <p class="city">New Cairo</p>
            <p class="date">{this.state.date}</p>
          </div>
          <div class="col-4">
            <p class="temp">{this.state.temperature}°</p>
            <p class="dewpoint">{this.state.apparentTemperature}° / {this.state.dewPoint}°</p>
            <p class="status">{this.state.summary}</p>
          </div>
        </div>

        <br />
        <br />

        <div class="page-content">

          <div class="tabbed">
            <input type="radio" id="tab1" name="css-tabs" checked />
            <input type="radio" id="tab2" name="css-tabs" />

            <ul class="tabs">
              <li class="tab"><label for="tab1">Hourly</label></li>
              <li class="tab"><label for="tab2">Daily</label></li>
            </ul>

            <div class="tab-content">
              <div class="sideways">
              {this.state.hourlyForecast.map((hourly) => {
                return <div>
                  <p class="hourly-time">{hourly.time.toString().slice(0, 2)}:00</p>
                  <p class="hourly-time">{Math.round(hourly.apparentTemperature)}°</p>
                </div>
              })}
              </div>
            </div>

            <div class="tab-content">
              <div class="sideways">
              {this.state.dailyForecast.map((daily) => {
                return <div>
                  <p class="hourly-time">{daily.time.toString().slice(0, 2)}:00</p>
                  <p class="hourly-time">{Math.round(daily.apparentTemperatureHigh)}°</p>
                </div>
              })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
