import React, {  useState } from 'react';
import { Search, Globe, Menu, User, Bell, Moon, Sun } from 'lucide-react';
import '../index.css'
import Profile from './Profile';
import ExploreHome from './ExploreHome';
import ChatsPage from './ChatsPage';

const AirbnbHomePage = ({onLogout}) => {
  const email = localStorage.getItem('email');
  const [isOpen, setIsOpen] = useState(false)
  const [toProfile, setToProfile] = useState(false)
  const [toHome, setToHome] = useState(true)
  const [toLogOut, setToLogOut] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleHomeClick = () => {
    setToHome(true);
    setToProfile(false)
    setIsOpen(false); // Close the menu after clicking
  };

  const handleProfileClick = () => {
    setToProfile(true);
    setToHome(false)
    setIsOpen(false); // Close the menu after clicking
  };

  const handleLogoutClick = () => {
    onLogout();
    setIsOpen(false); // Close the menu after clicking
    console.log('Logout clicked'); // Optional: Debugging or additional logic
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#fdf4ff' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: '1px solid #e5c1f5' }}>
  <div style={{ display: 'flex', alignItems: 'center', color: '#ad0bde' }}>
    <span style={{ marginLeft: '10px', fontSize: '20px', fontWeight: 'bold' }}>F1bnb</span>
  </div>
  
  {/* Filters Section */}
  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexGrow: 1, justifyContent: 'center' }}>
    <div style={{ padding: '10px 15px', borderRadius: '20px', boxShadow: '0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)', backgroundColor: 'white', display: 'flex', alignItems: 'center' }}>
      <input type="text" placeholder="Location" style={{ border: 'none', outline: 'none', flexGrow: 1 }} />
      <input type="date" style={{ border: 'none', outline: 'none', marginLeft: '10px', flexGrow: 1 }} />
      <input type="number" placeholder="Guests" style={{ border: 'none', outline: 'none', marginLeft: '10px', flexGrow: 1 }} />
      <Search size={16} color="#ad0bde" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '10px' }} />
    </div>
  </div>

  {/* Profile Section */}
  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
    <span>{email}</span>
    <Globe size={16} color="#ad0bde" />
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '5px 10px', border: '1px solid #ad0bde', borderRadius: '20px' }}>
      <div style={{ display: 'flex', justifyContent: "end" }}>
        <div className="simple-menu">
          <button className="simple-menu__button" onClick={toggleMenu} aria-haspopup="true" aria-expanded={isOpen}>
            <Menu size={24} color='#ad0bde'/>
          </button>
          <div className={`simple-menu__dropdown ${isOpen ? 'simple-menu__dropdown--open' : ''}`}>
            <a href="#home" className="simple-menu__item" onClick={handleHomeClick}>Home</a>
            <a href="#profile" className="simple-menu__item" onClick={handleProfileClick}>Profile</a>
            <a href="#favorites" className="simple-menu__item">Favorites</a>
            <a href="#settings" className="simple-menu__item">Account Settings</a>
            <a href="#logout" className="simple-menu__item" onClick={handleLogoutClick}>Logout</a>
          </div>
        </div>
      </div>
    </div>
    <div>
      {/* Notification Bell */}
      <Bell size={16} color="#ad0bde" style={{ cursor: 'pointer' }} />
    </div>
    <div>
      {/* Theme Toggle */}
      <button onClick={toggleTheme} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
        {isDarkMode ? <Moon size={16} color="#ad0bde" /> : <Sun size={16} color="#ad0bde" />}
      </button>
    </div>
  </div>
</header>

      {toProfile && <Profile email = {email}/>}
      {toHome && <ExploreHome />}
    </div>
  );
};

export default AirbnbHomePage;

