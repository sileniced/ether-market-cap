import React, { Component } from 'react';
import Parser from '../services/Parser';

class TokenRow extends Component
{

    render() {

        const { balance, tokenInfo, cryptoCompare } = this.props.token;
        const { name, symbol, price } = tokenInfo;
        const { marketCapUsd, rate, diff, diff7d, share, worth, worth24h, worth7d } = price;

        Parser.setCurrency(this.props.currency);

        return (
            <tbody className="table-body">
            <tr>
                <td className={"col-logo"}                  >{Parser.logo(cryptoCompare)}</td>
                <td className={"col-name"}                  >{Parser.name(name)}</td>
                <td className={"col-balance text-right"}    >{Parser.balance(balance)}</td>
                <td className={"col-symbol"}                >{symbol}</td>
                <td className={"col-share text-right"}      >{Parser.share(share)}</td>
                <td className={"col-rate text-right"}       >{Parser.rate(rate)}</td>
                <td className={"col-worth text-right"}      >{Parser.worth(worth)}</td>
                <td className={"col-diff text-right " + Parser.diffColor(diff)}>
                    <p>{Parser.diff(diff)}</p>
                    <p className={'diff-worth'}>{Parser.worth(worth24h)}</p>
                </td>
                <td className={"col-diff7d " + Parser.diffColor(diff7d)}>
                    <p>{Parser.diff(diff7d)}</p>
                    <p className={'diff-worth'}>{Parser.worth(worth7d)}</p>
                </td>
                <td className={"col-market text-right"}     >{Parser.marketCapUsd(marketCapUsd)}</td>
            </tr>
            <tr>
                <td className="table-row-hidden" colSpan={10}>
                     <div className="collapse">
                         <div className="row table-row-hidden-wrapper shadow-border">
                             haha
                         </div>
                    </div>
                </td>
            </tr>
            </tbody>
        )
    }
}

export default TokenRow