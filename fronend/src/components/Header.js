import React from 'react';
import './styles/Header.css';
import Manny from './Assets/Manny.png';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
    return (
        <header className="header">
            <div className="header-content">
                <h1>ZeNalam</h1>
                <div className="header-right">
                    {/* <div className="search-container">
                        <input type="text" placeholder="Search" />
                        <FaSearch className="search-icon" />
                    </div> */}
                    <div className="profile-pic">
                        <img src={Manny} alt="Profile" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
