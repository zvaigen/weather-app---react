import React, { Component } from 'react';
//import { Button } from 'reactstrap';
import Section from './../Section/Section'
import {getWeather} from './../../actions/mainActions'
import './Header.css'
import {Button} from "reactstrap";
import Loading from "../Loading/Loading";
class Header extends Component {
    state= {
        weather:[],
      loader:false
    };
    loader = false;
  componentWillMount(){
    let self = this;
    this.setState({loader:true});
    getWeather("tel+aviv").then((res)=>{
      let newWeather = self.state.weather;
      newWeather.push(res);
      self.setState({
        weather:newWeather,
        loader:false
      })
    })
    getWeather("ashdod").then((res)=>{
      let newWeather = self.state.weather;
      newWeather.push(res);
      self.setState({
        weather:newWeather,
        loader:false
      })
      

    })
  }
  getCity(){
    let self = this;
    this.setState({loader:true});
    let newCity= this.city.value.replace(" ","+");
    getWeather(newCity).then((res)=>{
      let newWeather = self.state.weather;
      newWeather.push(res);
      self.setState({
        weather:newWeather,
        loader:false
      })
    });
    this.city.value='';

  }
  render() {
    let w = this.state.weather;
    return (
      <div >
        <h2>Welcome to react weather app</h2>
        <input type="text"  ref={(input)=> {this.city= input}}/>
        <Button color="info" onClick={()=>this.getCity()}>Find</Button>{' '}
        <div className="myHeader">
          {!this.state.loader?w.map((weather,i) =>
             <Section weather={weather} key={i}/>
          ):<Loading/>}

        </div>

      </div>
    );
  }
}

export default Header;
