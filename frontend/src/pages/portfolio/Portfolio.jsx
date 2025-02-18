import React from 'react';
import './Portfolio.css'
import Port_Card from '../../components/PortCard/PortCard.jsx';
import netten_analytics from '../../assets/netten_analytics_hp.png'
import perspective from '../../assets/perspective.png'
import pong from '../../assets/pong_game_pic.png'
import snake from '../../assets/snake_game_pic.png'

const Portfolio = () => {
  return (
    <div className='portfolio-section'>
      <h2 className='title'>My <span>Portfolio</span></h2>
      <div className='portfolio-container'>
        <Port_Card 
          text="Displays in a chart the revenue and net profit obtained by companies in the last five years"
          img={netten_analytics}
          link="https://github.com/dennisephraim/Netten-Analytics"
        />
        <Port_Card 
          text="Monitors a live price stream and triggers an alert when prices cross predefined boundaries"
          img={perspective}
          link="https://github.com/dennisephraim/Perspective"
        />
        <Port_Card 
          text="A simple two player ping pong game design with Turtle graphics"
          img={pong}
          link="https://github.com/dennisephraim/Python-Projects/tree/main/ping_pong"
        />
        <Port_Card 
          text="My version of snake built with python turtle graphics"
          img={snake}
          link="https://github.com/dennisephraim/Python-Projects/tree/main/snake_game_update"
        />
      </div>
    </div>
  );
};

export default Portfolio;
