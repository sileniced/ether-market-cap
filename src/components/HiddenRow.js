import React, { Component } from 'react';
import Parser from '../services/Parser';
import './HiddenRow.css';

class HiddenRow extends Component
{
    render() {

        const { tokenInfo, cryptoCompare, userShare } = this.props.token;
        const { name, symbol } = tokenInfo;
        const { TotalCoinSupply } = cryptoCompare;

        console.log(cryptoCompare);

        return (
            <tr>
                <td colSpan={10}>
                    <div className={'hidden-row'}>
                        {Parser.logo(cryptoCompare, 'hidden-row')}
                        <span className={'hidden-row-title'}>{name}</span>
                        <div className={'row'}>
                            <div className={'col-md-6'}>
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
                            <div className={'col-md-6'}>
                                <div className={"table-responsive"}>
                                    <table className={"table"}>
                                        <thead>
                                        <tr className={'hidr-whatif-top-header'} >
                                            <th colSpan={2}>What if you sold <i>x time</i> ago and bought now</th>
                                        </tr>
                                        <tr>
                                            <th>24h</th>
                                            <th>7d</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr className={'hidr-whatif-bottom-header'}>
                                            <td>{Parser.TotalCoinSupply(TotalCoinSupply)} {symbol}</td>
                                            <td>{Parser.userShare(userShare)}</td>
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