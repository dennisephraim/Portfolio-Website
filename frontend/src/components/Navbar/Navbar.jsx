import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import toggle_dark from '../../assets/day.png'
import toggle_light from '../../assets/night.png'

const Navbar = ({theme, setTheme}) => {

  const toggle_mode = ()=>{
    theme == 'light' ? setTheme('dark') : setTheme('light'); 
  }

  return (
    <div className='navbar'>
      
      <nav>
        <li><NavLink className='mylink' to="/">HOME</NavLink></li>
        <li><NavLink className='mylink' to="/About">ABOUT</NavLink></li>
        <li><NavLink className='mylink' to="/Portfolio">PORTFOLIO</NavLink></li>
        <li><NavLink className='mylink' to="/Contact">CONTACT</NavLink></li>
      </nav>

      <img title={theme} onClick={()=>{toggle_mode()}} src={theme == 'light' ? toggle_light : toggle_dark} alt='' className='toggle-icon'/>
    </div>
  );
};

export default Navbar;
