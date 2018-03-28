import React, { PureComponent } from 'react';

import LandingsPage from '../components/LandingsPage';
import AddressPage from '../containers/AddressPage';

class Page extends PureComponent
{
    render () {
        const address = this.props.match.params.address;
        const currency = this.props.match.params.currency;

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
                    <div className={'address-page-container'}>
                        <AddressPage address={address} currency={currency} />
                    </div>
                    <footer className={'footer'}>
                        made with:
                        <a href={'https://ethplorer.io'}>ethplorer</a>
                        <a href={'https://coinmarketcap.com'}>coinmarketcap</a>
                        <a href={'https://cryptocompare.com'}>cryptocompare</a>
                    </footer>
                </div>
            );
    }
}

export default Page;