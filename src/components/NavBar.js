import React, { PureComponent } from 'react'

class NavBar extends PureComponent
{
    render ()
    {
        return (
            <nav className="navbar fixed-top navbar-dark bg-dark justify-content-between">
                <div className={'container'}>
                    <a className="navbar-brand" href="/" >erc20 tracker</a>
                    <form className="form-inline" id="search-form">
                        <input className="form-control mr-sm-2" id="search-input" type="search" placeholder="address" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">lookup</button>
                    </form>
                </div>
            </nav>
        );
    }
}


export default NavBar;