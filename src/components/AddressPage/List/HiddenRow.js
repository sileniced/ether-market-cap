import React, { Component } from 'react';
import Parser from '../../../services/Parser';
import './HiddenRow.css';

class HiddenRow extends Component
{
    render() {

        const { tokenInfo, cryptoCompare, userShare, balance24h, balance7d, balance24h_diff, balance7d_diff } = this.props.token;
        const { name, symbol, price } = tokenInfo;
        const { rate24h, rate24h_diff, rate7d, rate7d_diff } = price;
        const { TotalCoinSupply } = cryptoCompare;

        return (
            <tr>
                <td colSpan={10}>
                    <div className={'hidden-row'}>
                        {Parser.logo(cryptoCompare, 'hidden-row')}
                        <span className={'hidden-row-title'}>{name}</span>
                        <div className={'row'}>

                            <div className={'col-md-5'}>
                                <div className={"table-responsive"}>
                                    <table className={"table"}>
                                        <thead>
                                        <tr>
                                            <th>Total supply</th>
                                            <th>Your share</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>{Parser.TotalCoinSupply(TotalCoinSupply)} {symbol}</td>
                                            <td>{Parser.userShare(userShare)}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className={'col-md-7'}>
                                <div className={"table-responsive"}>
                                    <table className={"table"}>
                                        <thead>
                                        <tr className={'hidr-whatif-top-header'} >
                                            <th colSpan={4}>Price then</th>
                                        </tr>
                                        <tr className={'hidr-whatif-bottom-header'}>
                                            <th colSpan={2}>24h</th>
                                            <th colSpan={2}>7d</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>{Parser.rate(rate24h)}</td>
                                            <td>{Parser.rate(rate24h_diff)}</td>
                                            <td>{Parser.rate(rate7d)}</td>
                                            <td>{Parser.rate(rate7d_diff)}</td>
                                        </tr>
                                        </tbody>
                                        <thead>
                                        <tr className={'hidr-whatif-top-header'} >
                                            <th colSpan={4}>What if you sold <i>x time</i> ago and bought now</th>
                                        </tr>
                                        <tr className={'hidr-whatif-bottom-header'}>
                                            <th>24h</th>
                                            <th>{Parser.balanceDiff(balance24h_diff)}</th>
                                            <th>7d</th>
                                            <th>{Parser.balanceDiff(balance7d_diff)}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>{Parser.balance(balance24h)} {symbol}</td>
                                            <td>{Parser.balance(balance24h_diff)} {symbol}</td>
                                            <td>{Parser.balance(balance7d)} {symbol}</td>
                                            <td>{Parser.balance(balance7d_diff)} {symbol}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </td>
            </tr>
        )
    }
}

export default HiddenRow