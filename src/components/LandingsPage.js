import React, { PureComponent } from 'react';
import './LandingsPage.css';

class LandingsPage extends PureComponent
{
    constructor() {
        super();

        this.state = {
            address: '',
            currency: ''
        };
    }

    onCurrencyChange (currency) {
        if (currency !== '') currency = '/' + currency;
        this.setState({currency})
    }

    render() {
        const { address, currency } = this.state;
        return (
            <div>
                <h1 className={'display-4 title'}>Track your erc20 tokens</h1>
                <form className={'form-inline'} action={ address + currency } >
                    <div className={'landing-content'}>
                        <span>
                            erc20tracker.com/&nbsp;
                        </span>
                        <input
                            id={'landing-form-address'}
                            className={'landing-form form-control'}
                            placeholder={'address'}
                            onChange={address => this.setState({address: '/' + address.target.value})}
                        />
                        &nbsp;/&nbsp;
                        <input
                            id={'landing-form-currency'}
                            className={'landing-form form-control'}
                            placeholder={'USD'}
                            onChange={currency => this.onCurrencyChange(currency.target.value)}
                        />
                        <button
                            id={'landing-form-submit'}
                            className={"landing-form btn btn-outline-success"}
                            type={'submit'}
                        >
                            lookup
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default LandingsPage