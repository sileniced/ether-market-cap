import React, { PureComponent } from 'react';
import Parser from "../../../services/Parser";

class TokenRowNoPrice extends PureComponent
{
    render() {

        const { balance, tokenInfo, cryptoCompare } = this.props.token;
        const { name, symbol } = tokenInfo;

        return (
            <tbody className="table-body">
            <tr>
                <td className={"col-logo"}                 >{Parser.logo(cryptoCompare)}</td>
                <td className={"col-token"}                >{Parser.name(name)}</td>
                <td className={"col-balance text-right"}   >{Parser.balance(balance)}</td>
                <td className={"col-symbol"}               >{symbol}</td>
            </tr>
            </tbody>
        )
    }
}

export default TokenRowNoPrice