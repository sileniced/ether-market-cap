import React, { Component } from 'react';
import Parser from "../../../services/Parser";

class SellRow extends Component
{


    constructor() {

        super();

        this.state = {
            isChecked: false
        }
    }

    render ()
    {
        const { token, onCheckboxChange, sellAmount } = this.props;
        const { balance, tokenInfo, cryptoCompare, key } = token;
        const { name, symbol, price } = tokenInfo;
        const { worth, rate } = price;

        const { isChecked } = this.state;

        const onThisCheckboxChange = () => {
            onCheckboxChange(!isChecked);
            this.setState({isChecked: !isChecked});
        };

        return (
            <tr>
                <td className="sell-row-checkbox"           ><input type="checkbox" value={key} onChange={onThisCheckboxChange}/></td>
                <td className={"col-logo"}                  >{Parser.logo(cryptoCompare)}</td>
                <td className={"col-name"}                  >{Parser.name(name)}</td>
                <td className={"col-balance text-right"}    >{Parser.balance(balance)}</td>
                <td className={"col-symbol"}                >{symbol}</td>
                <td className={"col-balance text-right"}    >{isChecked && Parser.balance(sellAmount / rate)}</td>
                <td className={"col-symbol"}                >{isChecked && symbol}</td>
                <td className={"col-balance text-right"}    >{isChecked && Parser.balance(balance - (sellAmount / rate))}</td>
                <td className={"col-symbol"}                >{isChecked && symbol}</td>
                <td className={"col-worth text-right"}      >{Parser.worth(worth)}</td>
                <td className={"col-worth text-right"}      >{isChecked && Parser.worth(worth - sellAmount)}</td>
            </tr>
        )
    }
}

export default SellRow