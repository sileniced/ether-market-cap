import React, { PureComponent } from 'react';

import LandingsPage from '../components/LandingsPage';
import AddressPage from '../containers/AddressPage';

class Page extends PureComponent
{
    render () {
        const pathname = this.props.location.pathname.replace('/', '');

        return (pathname === '') ?
            (
                <div className={'container'}>
                    <LandingsPage />
                </div>
            ) :
            (
                <div className={'container-fluid'}>
                    <h1 className={'display-4 title'}>Address Page</h1>
                    <p className={'under-title'}>{pathname}</p>
                    <div className={'address-page-container'}>
                        <AddressPage address={pathname} />
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