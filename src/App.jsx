import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './pages/about/About';
import Portfolio from './pages/portfolio/Portfolio';
import Contact from './pages/contact/Contact';
import Homepage from './pages/homepage/Homepage';
import Navbar from './components/Navbar/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'


const App = () => {

  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');

  useEffect(()=>{
    localStorage.setItem('current_theme', theme)
  }, [theme])
  
  if (theme == 'light') {
    document.body.style.backgroundColor = 'white';
  } else {
    document.body.style.backgroundColor = '#161618';
    document.body.style.transition = '0.5s';
  };

  return (
    <div className={`mycontainer ${theme}`}>
      <Router basename="/portfolio-website">
        
        <Navbar theme={theme} setTheme={setTheme}/>
        
        <Routes>      
          <Route path="/" element={<Homepage />} />
          <Route path="/About" element={<About />} />
          <Route path="/Portfolio" element={<Portfolio />} />
          <Route path="/Contact" element={<Contact />} />    
        </Routes>
      </Router>
    </div>
  );
};

export default App;
