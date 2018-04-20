import React, { Component } from 'react';
import Parser from "../../../services/Parser";
import './Sell.css';
import SellForm from "./SellForm";

class Sell extends Component
{

    constructor (props)
    {
        super(props);

        this.state = {
            sellAmount: 0,
            tokens: props.tokens
        }
    }

    render () {

        const { tokens } = this.state;

        const c = {
            na: 'header-name',
            ba: 'header-balance text-right',
            sa: 'header-sell-amount text-right',
            nb: 'header-new-balance text-right',
            wo: 'header-worth text-right',
            nw: 'header-new-worth text-right'
        };

        const onAmountChange = (val) => this.setState({sellAmount: val});

        return (
            <div>

                <SellForm onAmountChange={onAmountChange}/>

                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th> </th>
                            <th className={c.na} colSpan={2}>Token</th>
                            <th className={c.ba}>Balance</th>
                            <th />
                            <th className={c.sa}>Sell Amount</th>
                            <th />
                            <th className={c.nb}>New Balance</th>
                            <th />
                            <th className={c.wo}>Worth</th>
                            <th className={c.nw}>New Worth</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tokens.map((token) => {

                            const { balance, tokenInfo, cryptoCompare } = token;
                            const { name, symbol, price } = tokenInfo;
                            const { worth } = price;

                            return (
                                <tr key={token.key}>
                                    <td> </td>
                                    <td className={"col-logo"}                  >{Parser.logo(cryptoCompare)}</td>
                                    <td className={"col-name"}                  >{Parser.name(name)}</td>
                                    <td className={"col-balance text-right"}    >{Parser.balance(balance)}</td>
                                    <td className={"col-symbol"}                >{symbol}</td>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                    <td className={"col-worth text-right"}      >{Parser.worth(worth)}</td>
                                    <td> </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default Sell