import React ,{useState} from 'react'
import { Link } from 'react-router-dom'
import '../assets/Navbar.css'

const Navbar = () => {
  const [ismobilemenopen,setMobilemenopen]=useState(false);

  const toggleMobilemen = () => {
    setMobilemenopen(!ismobilemenopen);
  };
  return (
    <nav className='navbar' style={{
      position:'fixed',
      top:'0',
      width:'100%',
      zIndex:'100',
      backgroundColor: 'white',
      boxShadow:'0 1px 4px 0 rgba(0,0,0,0.2)',
    }}>
      <div className='navbar-container'>
        <Link to="/" className='navbar-logo' style={{marginLeft:'50px'}}>
          <p><span style={{fontSize:'xxx-large'}}>G</span>dscJU.<span className='blink'>GG</span></p>
        </Link>
        <div className="mobile-menu-toggle" onClick={toggleMobilemen}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className={`nav-menu ${ismobilemenopen?'active':''}`}>
          <li className='nav-item'>
            <Link to="/text" className='nav-link' onClick={toggleMobilemen}>
              Text Gemini Model 
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/image" className="nav-link" onClick={toggleMobilemen}>
              Image Gemini Model
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar