import React, { Component } from 'react';

import LandingsPage from './Landing/LandingsPage';
import AddressPage from './AddressPage/AddressPage';

class Page extends Component
{
    render () {
        const address = this.props.match.params.address;
        const currency = (this.props.match.params.currency !== undefined) ? this.props.match.params.currency.toUpperCase() : undefined;

        return (address === undefined) ?
            (
                <div className={'container'}>
                    <LandingsPage />
                </div>
            ) :
            (
                <div className={'container'}>
                    <h1 className={'display-4 title'}>Address Page</h1>
                    <p className={'under-title'}>{address}</p>
                    <AddressPage address={address} currency={currency} />
                    <footer className={'footer'}>
                        made with:
                        <a href={'https://ethplorer.io'}>ethplorer</a>
                        <a href={'https://coinmarketcap.com'}>coinmarketcap</a>
                        <a href={'https://cryptocompare.com'}>cryptocompare</a>
                    </footer>
                </div>
            )
        ;
    }
}

export default Page;