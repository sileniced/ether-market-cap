import React, { Component } from 'react'

class NavBar extends Component
{
    constructor() {
        super();

        this.state = {
            address: '',
            currency: ''
        };
    }

    onCurrencyChange (currency) {
        if (currency !== '') currency = '/' + currency.toUpperCase();
        this.setState({currency})
    }

    render ()
    {
        const { address, currency } = this.state;
        return (
            <nav className="navbar fixed-top navbar-dark bg-dark justify-content-between">
                <div className={'container'}>
                    <a className="navbar-brand" href="/" >erc20 tracker</a>
                    <form className="form-inline" id="search-form" action={ address + currency } >
                        <input
                            className="form-control mr-sm-2"
                            id="search-input-address"
                            type="search"
                            placeholder="address"
                            aria-label="Address"
                            onChange={address => this.setState({address: '/' + address.target.value})} />
                        <input
                            className="form-control mr-sm-2"
                            id="search-input-currency"
                            type="search"
                            placeholder="USD"
                            aria-label="Currency"
                            onChange={currency => this.onCurrencyChange(currency.target.value)} />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">lookup</button>
                    </form>
                </div>
            </nav>
        );
    }
}


export default NavBar;