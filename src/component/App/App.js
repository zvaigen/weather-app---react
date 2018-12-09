import React, { Component } from 'react';
import Header from './../Header/Header'
import './App.css';



class App extends Component {
  constructor(props){
    super(props);
   this.state ={
     name:"Nadav"
   } 
   this.HandleChangeName.bind(this);
  }
  HandleChangeName(){
    this.setState({
      name:"Zvaig"
    })
  }
  render() {
    let name = this.state.name;
    return (
      <div className="App">
        <h2 onClick={()=>this.HandleChangeName()}>{name}</h2>
        
        <Header/> 

      </div>
    );
  }
}

export default App;
