import React, { Component } from 'react';
import Parser from '../../../services/Parser';
import './TokenRow.css';
import HiddenRow from './HiddenRow';

class TokenRow extends Component
{

    constructor () {
        super();
        this.state = {
            isHidden: true
        }
    }

    toggleHidden = () => {
        this.setState({
            isHidden: !this.state.isHidden
        })
    };

    render() {

        const { balance, tokenInfo, cryptoCompare } = this.props.token;
        const { name, symbol, price } = tokenInfo;
        const { marketCapUsd, rate, diff, diff7d, share, worth, worth24h, worth7d } = price;

        return (
            <tbody>
            <tr className="table-body" onClick={this.toggleHidden.bind(this)} >
                <td className={"col-logo"}                  >{Parser.logo(cryptoCompare)}</td>
                <td className={"col-name"}                  >{Parser.name(name)}</td>
                <td className={"col-balance text-right"}    >{Parser.balance(balance)}</td>
                <td className={"col-symbol"}                >{symbol}</td>
                <td className={"col-share text-right"}      >{Parser.share(share)}</td>
                <td className={"col-rate text-right"}       >{Parser.rate(rate)}</td>
                <td className={"col-worth text-right"}      >{Parser.worth(worth)}</td>
                <td className={"col-diff text-right " +       Parser.diffColor(diff)}>
                    <p>{Parser.diff(diff)}</p>
                    <p className={'diff-worth'}>             {Parser.worth(worth24h)}</p>
                </td>
                <td className={"col-diff7d " +                Parser.diffColor(diff7d)}>
                    <p>{Parser.diff(diff7d)}</p>
                    <p className={'diff-worth'}>             {Parser.worth(worth7d)}</p>
                </td>
                <td className={"col-market text-right"}     >{Parser.marketCapUsd(marketCapUsd)}</td>
            </tr>
            {!this.state.isHidden && <HiddenRow token={this.props.token}/>}
            </tbody>
        )
    }
}

export default TokenRow