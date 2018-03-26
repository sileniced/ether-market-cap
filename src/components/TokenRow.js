import React, { PureComponent } from 'react';
import Parser from '../services/Parser';


class TokenRow extends PureComponent
{

    render() {

        const { balance, tokenInfo, cryptoCompare } = this.props.token;
        const { name, symbol, price } = tokenInfo;
        const { marketCapUsd, rate, diff, diff7d, share, worth } = price;

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
                <td className={"col-diff text-right " +
                Parser.diffColor(diff)}                     >{Parser.diff(diff)}</td>
                <td className={"col-diff7d " +
                Parser.diffColor(diff7d)}                   >{Parser.diff7d(diff7d)}</td>
                <td className={"col-market text-right"}     >{Parser.marketCapUsd(marketCapUsd)}</td>
            </tr>
            </tbody>
        )
    }
}

export default TokenRow