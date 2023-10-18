import { useRef} from "react";
import { FaBars, FaTimes} from "react-icons/fa";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import logo from "../assets/logo.png";
import "./styles.scss";
import React from 'react'

/**
 * Navbar component that is positioned at the top of the screen with different links to different pages. The different 
 * links include Portfolio, Orders, Rewards, Cash, Messages, and Account. 
 * @returns - Navbar component
 */
function Navbar() {
	const navRef = useRef();
	// toggles to turn navbar on and off 
	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	}

	return (
		<header>
			<div className='logo-div'>
				<img className="logo-div-image" src={logo} alt='siege-logo'></img>
				<a href='/'><h1 className='logo-div-title'>Siege</h1></a>
				<SearchBar/>
			</div>
			<nav ref={navRef}>
				<Link className='links' to='/portfolio'>Portfolio</Link>
				<Link className='links' to='/orders'>Orders</Link>
				<Link className='links' to='/rewards'>Rewards</Link>
				<Link className='links' to='/cash'>Cash</Link>
				<Link className='links' to='/messages'>Messages</Link>
				<Link className='links' to='/account'>Account</Link>

				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button className="nav-btn" onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;