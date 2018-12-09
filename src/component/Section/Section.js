import React from 'react';
import { Card, CardImg, CardBody } from 'reactstrap';

const Section = (props) => {

  return (
    <div>
      <Card>
        <div style={{textAlign:"center"}}>
        <CardImg style={{height:50,width:50 }}  top width="100%" src={props.weather.img} alt="Card image cap" />
        </div>
        <CardBody>
        <div>{props.weather.city}</div>
        <div>Time: {props.weather.date}</div>
          <div>Temperature: {props.weather.temperature} </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Section;