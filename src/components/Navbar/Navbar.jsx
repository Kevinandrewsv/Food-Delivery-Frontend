import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount } = useContext(StoreContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State to control search bar visibility
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search input

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      setSearchQuery(""); // Clear the search input after search
    }
  };

  return (
    <div className='navbar'>
      {/* Wrap logo and title in a container for alignment */}
      <div className="navbar-brand">
        <Link to='/'><img className='logo' src={assets.logo} alt="Logo" /></Link>
        <h4 className='title'>Food Delivery</h4>
      </div>

      <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => { setMenu("home"); toggleMenu(); }} className={`${menu === "home" ? "active" : ""}`}>Home</Link>
        <a href='#explore-menu' onClick={() => { setMenu("menu"); toggleMenu(); }} className={`${menu === "menu" ? "active" : ""}`}>Menu</a>
        <a href='#app-download' onClick={() => { setMenu("mob-app"); toggleMenu(); }} className={`${menu === "mob-app" ? "active" : ""}`}>Mobile App</a>
        <a href='#footer' onClick={() => { setMenu("contact"); toggleMenu(); }} className={`${menu === "contact" ? "active" : ""}`}>Contact Us</a>
      </div>

      <div className="navbar-right">
        <i className="fa-solid fa-magnifying-glass" onClick={toggleSearch}></i>

        {/* Conditionally render the search bar */}
        {isSearchOpen && (
          <div className="search-bar">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInput}
              placeholder="Search..."
              className="search-input"
            />
            <button onClick={handleSearchSubmit} className="search-btn">Go</button>
          </div>
        )}

        <Link to='/cart' className='navbar-search-icon'>
          <i className="fa-solid fa-basket-shopping"></i>
          {getTotalCartAmount() > 0 && <div className="dot"></div>} {/* Conditional dot rendering */}
        </Link>
        <button onClick={() => setShowLogin(true)}>Sign In</button>
        <i className="fa-solid fa-bars" onClick={toggleMenu}></i> {/* Hamburger Icon */}
      </div>
    </div>
  );
}

export default Navbar;
