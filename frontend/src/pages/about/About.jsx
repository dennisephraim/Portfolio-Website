import React from 'react';
import resume from "../../assets/ephraim_resume.pdf"
import python from "../../assets/python.png"
import react from "../../assets/atom.png"
import css from "../../assets/css-3.png"
import mysql from "../../assets/database.png"
import html from "../../assets/html-5.png"
import c from "../../assets/letter-c.png"
import node from "../../assets/programing.png"
import javascript from "../../assets/java-script.png"
import './About.css'
import Resume_card from '../../components/ResumeCard/ResumeCard.jsx';

const About = () => {
  return (
    
    <div className='about-container'>
      <section className='education-experience'>
        <h2 className='title'>About <span>Ephraim</span></h2>
        <div className='about'>
          <div className='about-education'>
            <h3 className='resume-title'>Personal Info</h3>
            <ul className='details'>
              <li><span>First Name : </span><span>Ephraim</span></li>
              <li><span>Last Name : </span><span>Akai-Nettey</span></li>
              <li><span>School : </span><span>Yale University</span></li>
              <li><span>Major : </span><span>Computer Science</span></li>
              <li><span>Expected Graduation: </span><span>May 2027</span></li>
            </ul>
            <a href={resume} download="Ephraim's Resume" className="button">
              <span className="button_icon">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1vw" width="1vw" xmlns="http://www.w3.org/2000/svg"><path d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path></svg>
              </span>
              Download Resume
            </a>
          </div>
          <div className='about-experience'>
            <div className="stats-box">
              <h3 className="stats-no">1</h3>
              <p className="stats-title">Year of <br></br> Experience</p>
            </div>
            <div className="stats-box">
              <h3 className="stats-no">5</h3>
              <p className="stats-title">Projects <br></br> Completed</p>
            </div>
            <div className="stats-box">
              <h3 className="stats-no">2</h3>
              <p className="stats-title">Outside <br></br> Courseworks</p>
            </div>
            <div className="stats-box">
              <h3 className="stats-no">55+</h3>
              <p className="stats-title">Leetcode  <br></br> Solved</p>
            </div>
          </div>
        </div>
      </section> 

      <div className="separator"></div>
      
      <h5 className='title-section' >Experience & Education</h5>
      <section className='resume'>
        <div className='resume-data'>
          <h3 className='resume-title'>Experience</h3>
          <Resume_card 
            date='September 2023 - March 2024'
            title='RESEARCH ASSISTANT'
            company='- Yale Psychology Department'
            description='Utilized Selenium to extract data from a targeted website. 
            Collected information on 3000+ prospective participants for the study increasing the potential participant pool by 30%
            Implemented data cleaning and transformation processes before storing information in SQL database.'
            tools='Selenium, Python, SQL'
          />
          <Resume_card 
            date='August 2023 - September 2023'
            title='SOFTWARE ENGINEERING EXPERIENCE'
            company='- J.P. Morgan Chase & Co'
            description='Used data visualization to represent historical stock price movements.
            Cross-boundary triggers using principal component visualization software such as perspective.
            Analyzed stock ratios and created informative data feeds to aid in investment and trading decisions.'
            tools='Perspective, Python'
          />
        </div>
        <div className='education'>
          <h3 className='resume-title'>Education</h3>
          <Resume_card 
            date='2023 - 2027'
            title='COMPUTER SCIENCE'
            company='- Yale University, New Haven, Connecticut'
            description1='Data Structures'
            description2='Systems Programming'
            description3='Algorithms'
            description4='Computer Architecture'
            description5='Object-Oriented Programming'
            description6='Calculus'
            description7='Discrete Math' 
            description8='Functional Programming'/>
        </div>
      </section>  

      <div className="separator"></div>  

      <h5 className='title-section' >My Skills</h5>
      <section className='skills'>
        <div className='skills-container-grid'>
          <div className='skill-box'>
            <img className='skill-box-img' src={python} alt='python-img'></img>
            <h4>python</h4>
          </div>
          <div className='skill-box'>
            <img className='skill-box-img' src={javascript} alt='python-img'></img>
            <h4>JavaScript</h4>
          </div>
          <div className='skill-box'>
            <img className='skill-box-img' src={c} alt='python-img'></img>
            <h4>C</h4>
          </div>
          <div className='skill-box'>
            <img className='skill-box-img' src={mysql} alt='python-img'></img>
            <h4>MySQL</h4>
          </div>
          <div className='skill-box'>
            <img className='skill-box-img' src={react} alt='python-img'></img>
            <h4>React</h4>
          </div>
          <div className='skill-box'>
            <img className='skill-box-img' src={css} alt='python-img'></img>
            <h4>CSS</h4>
          </div>
          <div className='skill-box'>
            <img className='skill-box-img' src={html} alt='python-img'></img>
            <h4>HTML</h4>
          </div>
          <div className='skill-box'>
            <img className='skill-box-img' src={node} alt='python-img'></img>
            <h4>Node</h4>
          </div>
        </div>
      </section>        
    </div>
  );
};

export default About;
