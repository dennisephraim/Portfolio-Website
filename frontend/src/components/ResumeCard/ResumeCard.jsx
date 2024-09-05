import React from 'react';
import './ResumeCard.css'

const ResumeCard = (props) => {
    return (
        <div class="resume-item">
            <h6>{props.date}</h6>
            <h4><span>{props.title}</span> {props.company}</h4>
            <p>{props.description}</p>
            <ul>
                <li>{props.description1}</li>
                <li>{props.description2}</li>
                <li>{props.description3}</li>
                <li>{props.description4}</li>
                <li>{props.description5}</li>
                <li>{props.description6}</li>
                <li>{props.description7}</li>
                <li>{props.description8}</li>
            </ul>
            <h5>{props.tools}</h5>
        </div>        
        )
    }
export default ResumeCard;