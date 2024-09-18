import React from 'react';
import './PortCard.css'

const PortCard = (props) => {
    return (
        <a className='htag' href={props.link}>
            <div className='port-card'>
                <img src={props.img} className="card-img" alt="..."/>
                <div className="port-card-body">
                    <p className="port-card-text">
                        {props.text}
                    </p>
                </div>
            </div>  
        </a>
        )
    }
export default PortCard;