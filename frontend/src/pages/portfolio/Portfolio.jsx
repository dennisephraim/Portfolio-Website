import React from 'react';
import './Portfolio.css'
import Port_Card from '../../components/PortCard/PortCard.jsx';
import myimg from '../../assets/python.png'

const Portfolio = () => {
  return (
    <div className='portfolio-section'>
      <h2 className='title'>My <span>Portfolio</span></h2>
      <div className='portfolio-container'>
        <Port_Card 
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
          img={myimg}
        />
        <Port_Card 
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
          img={myimg}
        />
        <Port_Card 
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
          img={myimg}
        />
        <Port_Card 
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
          img={myimg}
        />
      </div>
    </div>
  );
};

export default Portfolio;
