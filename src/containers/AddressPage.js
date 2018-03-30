import React, { Component } from 'react';

import TokenRow from '../components/TokenRow';
import TokenRowNoPrice from "../components/TokenRowNoPrice";
import Parser from '../services/Parser';
import Sorter from '../services/Sorter';
import Calc from "../services/Calc";

import * as Request from 'superagent'

import { symbols } from '../vendors/Currencies';
import './AddressPage.css'

class AddressPage extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            addressInfo: {},
            total: {},
            tokens: [],
            order: 'worth',
            sorted: [],
            sortedCache: {},
            currency: {
                value: 1,
                symbol: symbols['USD']
            }
        };
    }

    // componentDidMount() {
    //     let addressInfo = {};
    //     Request.get('https://api.ethplorer.io/getAddressInfo/' + this.props.address + '?apiKey=freekey')
    //         .then(res => addressInfo = res.body)
    //         .catch(err => console.log(err));
    //
    //     console.log(addressInfo);
    // }

    componentDidMount() {

        const hasCurreny = this.props.currency === undefined;

        const requests = Promise.all([
            Request.get('https://api.ethplorer.io/getAddressInfo/' + this.props.address + '?apiKey=freekey'),
            Request.get('https://api.coinmarketcap.com/v1/ticker/ethereum/'),
            Request.get('https://min-api.cryptocompare.com/data/all/coinlist'),
            hasCurreny ? {} : Request.get('https://free.currencyconverterapi.com/api/v5/convert?q=USD_' + this.props.currency + '&compact=y')
        ]);

        const getBody = ([addressInfo, tokenInfo, allCoins, currency]) => [addressInfo.body, tokenInfo.body[0], allCoins.body.Data, currency.body];

        const parseResult = ([addressInfo, tokenInfo, allCoins, currency]) => {

            if (addressInfo.error !== undefined) {
                this.setState({
                    isLoaded: true,
                    error: { message: "this address is incomplete or it isn't an Ethereum address." }
                });
                return null;
            }

            if (Object.keys(currency).length === 0) {
                this.setState({
                    isLoaded: true,
                    error: { message: "The currency is unknown or not found, it might contain a typing error." }
                });

            } else if (currency !== undefined) {
                 currency = {
                    value: currency['USD_' + this.props.currency].val,
                    symbol: symbols[this.props.currency] || ''
                };
            }


            let tokens = (addressInfo.tokens).concat(Parser.ETH_asToken(addressInfo, tokenInfo));

            tokens.forEach(token => {
                token['cryptoCompare'] = allCoins[token.tokenInfo.symbol] || false;
                return null;
            });

            tokens = Sorter.placer(tokens);

            const { total, hasPrice } = Calc.initCalc(tokens.hasPrice);

            tokens['hasPrice'] = hasPrice;

            const sorted = Sorter.sorter(tokens.hasPrice, 'worth');
            const sortedCache = {worth: sorted};

            this.setState({
                isLoaded: true,
                addressInfo,
                total,
                tokens,
                sorted,
                sortedCache,
                currency
            });

            console.log([addressInfo, tokenInfo, allCoins, currency], tokens);
        };

        requests.then(getBody).then(parseResult).catch(([addressInfo, tokenInfo, allCoins, currency]) => console.log([addressInfo, tokenInfo, allCoins, currency]))
    }

    changeOrder(order) {
        let sortedCache = this.state.sortedCache;
        let sorted = this.state.sorted;

        if (this.state.order === order) {
            sorted.reverse();
        } else if (this.state.sortedCache[order] === undefined) {
            sorted = Sorter.sorter(this.state.tokens.hasPrice, order);
            sortedCache[order] = sorted;
        } else {
            sorted = this.state.sortedCache[order];
        }

        this.setState({
            order,
            sorted,
            sortedCache
        })
    }

    render() {
        const { error, isLoaded, total, sorted, tokens, currency } = this.state;
        const { totalWorth, totalWorth24h, totalWorth7d, totalDiff, totalDiff7d } = total;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {

            Parser.setCurrency(currency);

            return (
                <div className="table-responsive">
                    <table className="table">
                        <thead>

                        <tr className={'row-extra'}>
                            <th colSpan={2} className={"header-name"}                                                       >Token</th>
                            <th className={"header-balance text-right"}     onClick={() => this.changeOrder('balance')}     >Balance</th>
                            <th />
                            <th className={"header-share text-right"}       onClick={() => this.changeOrder('worth')}       >Share</th>
                            <th className={"header-rate text-right"}        onClick={() => this.changeOrder('rate')}        >Rate</th>
                            <th className={"extra-worth text-right"}
                                onClick={() => this.changeOrder('worth')} >

                                <p>                                             Worth</p>
                                <p className={'extra-row '}>{                   Parser.worth(totalWorth)}</p>

                            </th>
                            <th className={"extra-diff text-right " +           Parser.diffColor(totalDiff)}
                                onClick={() => this.changeOrder('diff')}>

                                <p>                                             24h</p>
                                <p className={'extra-row '}>{                   Parser.diff(totalDiff)}</p>
                                <p className={'extra-row diff-worth'}>{         Parser.worth(totalWorth24h)}</p>

                            </th>
                            <th className={"extra-diff7d " +                    Parser.diffColor(totalDiff7d)}
                                onClick={() => this.changeOrder('diff7d')}>

                                <p>                                             7d</p>
                                <p className={'extra-row '}>{                   Parser.diff(totalDiff7d)}</p>
                                <p className={'extra-row diff-worth'}>{         Parser.worth(totalWorth7d)}</p>

                            </th>
                            <th className={"header-market text-right"}      onClick={() => this.changeOrder('marketCapUsd')}>Market Cap</th>
                        </tr>

                        </thead>
                        {sorted.map((token, key) => (
                            <TokenRow key={key} token={token} currency={currency} />
                        ))}
                        {tokens.noPrice.map((token, key) => (
                            <TokenRowNoPrice key={key} token={token} />
                        ))}
                    </table>
                </div>
            );
        }
    }
}

export default AddressPage