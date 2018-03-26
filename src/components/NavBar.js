import React from 'react'

const NavBar = () => (
    <nav className="navbar fixed-top navbar-dark bg-dark justify-content-between">
        <a className="navbar-brand" href="/" target="_blank">Ether market cap</a>
        <form className="form-inline" id="search-form">
            <input className="form-control mr-sm-2" id="search-input" type="search" placeholder="insert address" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
    </nav>
);

export default NavBar;