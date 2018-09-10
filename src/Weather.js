import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Day from './Day';


const WeatherCard = styled.div`
  display: flex;
`

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = { temps: [], loading: true, status: [] }
  }
  componentDidMount() {
    axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=Lund,se&units=metric&APPID=aef11d8026de35e63a97cc8412ef1b2f`)
      .then(res => {
        const wantedObj = res.data.list
          .filter((time) => time.dt_txt.endsWith('18:00:00'));
        const wantedTemps = wantedObj.map((obj) => (
          obj.main.temp
        ));
        const weatherStatus = wantedObj.map((obj) => (
          obj.weather[0].main
        ));
        this.setState({ temps: wantedTemps, loading: false, status: weatherStatus });
      });

  }
  render() {
    const numDays = 5;
    var days = [];
    for (var i = 0; i < numDays; i++) {
      days.push(
        <Day
          key={i}
          daysToAdd={i}
          temp={this.state.temps[i]}
          statusText={this.state.status[i]} />
      );
    }
    return <WeatherCard>{days}</WeatherCard>;
  }
}

export default Weather;