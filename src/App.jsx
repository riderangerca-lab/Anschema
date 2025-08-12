import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Header from './components/Shared/Header';
import Footer from './components/Shared/Footer';
import Home from './components/Home/Home';
import About from './components/About/About';
import Portfolio from './components/Portfolio/Portfolio';
import Tools from './components/Tools/Tools';
import Contact from './components/Contact/Contact';
import './styles/GlobalStyles.css';

export default function App(){
  return <Router>
    <div style={{display:"flex",flexDirection:"column",minHeight:"100vh"}}>
      <Header/>
      <main style={{flex:"1",paddingTop:"64px"}}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/portfolio" element={<Portfolio/>}/>
          <Route path="/tools/*" element={<Tools/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
  </Router>;
}
