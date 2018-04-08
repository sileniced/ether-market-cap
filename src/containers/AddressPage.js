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

        this.hasCurreny = props.currency !== undefined;

        this.requests = Promise.all([
            Request.get('https://api.ethplorer.io/getAddressInfo/' + props.address + '?apiKey=freekey'),
            Request.get('https://api.coinmarketcap.com/v1/ticker/ethereum/'),
            Request.get('https://min-api.cryptocompare.com/data/all/coinlist'),
            this.hasCurreny ? Request.get('https://free.currencyconverterapi.com/api/v5/convert?q=USD_' + props.currency + '&compact=y') : {}
        ]);

        this.state = {
            error: null,
            isLoaded: false,
            total: {},
            tokens: [],
            order: 'worth',
            sorted: [],
            sortedCache: {},
            currency: {}
        };
    }

    componentDidMount() {

        const getBody = ([addressInfo, tokenInfo, allCoins, currency]) => {
            // console.log([addressInfo, tokenInfo, allCoins, currency]);
            return [addressInfo.body, tokenInfo.body[0], allCoins.body.Data, this.hasCurreny ? currency.body : currency];

        };
        const getError = ([addressInfo, tokenInfo, allCoins, currency]) =>
            console.log([addressInfo, tokenInfo, allCoins, currency ]);
        const parseResult = ([addressInfo, tokenInfo, allCoins, currency]) =>
        {

            if (addressInfo.error !== undefined)
            {
                this.setState({
                    isLoaded: true,
                    error: {
                        type: "address",
                        message: "this address is incomplete or it isn't an Ethereum address."
                    }
                });
                return null;
            }


            if (this.hasCurreny)
            {
                if (Object.keys(currency).length === 0) {
                    this.setState({
                        isLoaded: true,
                        error: {
                            type: "currency",
                            message: "The currency is unknown or not found, it might contain a typing error."
                        }
                    });
                    return null;
                }
                currency = {
                    value: currency['USD_' + this.props.currency].val,
                    symbol: symbols[this.props.currency] || ''
                };
            } else {
                currency = {
                    value: 1,
                    symbol: symbols['USD']
                }
            }


            let tokens = (addressInfo.tokens).concat(Parser.ETH_asToken(addressInfo, tokenInfo));

            tokens.forEach(token =>
            {
                token['cryptoCompare'] = allCoins[token.tokenInfo.symbol] || false;
                return null;
            });

            tokens = Sorter.placer(tokens);

            const { total, hasPrice } = Calc.initCalc(tokens.hasPrice);

            tokens['hasPrice'] = hasPrice;

            const sorted = Sorter.sorter(tokens.hasPrice, 'worth');
            const sortedCache = { worth: sorted };

            this.setState({
                isLoaded: true,
                addressInfo,
                total,
                tokens,
                sorted,
                sortedCache,
                currency
            });
        };

        this.requests
            .then(getBody)
            .then(parseResult)
            .catch(getError)
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

        const co = (key) => () => this.changeOrder(key);

        if (error) {
            return <div className={'table-replace'}>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className={'table-replace'}>Loading...</div>;
        } else {

            Parser.setCurrency(currency);

            const c = {
                na: 'header-name',
                ba: 'header-balance text-right',
                sh: 'header-share text-right',
                ra: 'header-rate text-right',
                wo: 'extra-worth text-right',
                di: `extra-diff text-right ${Parser.diffColor(totalDiff)}`,
                d7: `extra-diff7d ${Parser.diffColor(totalDiff7d)}`,
                ma: 'header-market text-right'
            };

            return (
                <div className="table-responsive">
                    <table className="table">
                        <thead>

                        <tr className={'row-header'}>
                            <th className={c.na} colSpan={2}>Token</th>
                            <th className={c.ba} onClick={co('balance')}>Balance</th>
                            <th onClick={co('balance')} />
                            <th className={c.sh} onClick={co('worth')}>Share</th>
                            <th className={c.ra} onClick={co('rate')}>Rate</th>
                            <th className={c.wo} onClick={co('worth')} >
                                <p>Worth</p>
                                <p className={'extra-row'}>{Parser.worth(totalWorth)}</p>
                            </th>
                            <th className={c.di} onClick={co('diff')}>
                                <p>24h</p>
                                <p className={'extra-row'}>{Parser.diff(totalDiff)}</p>
                                <p className={'extra-row diff-worth'}>{Parser.worth(totalWorth24h)}</p>
                            </th>
                            <th className={c.d7} onClick={co('diff7d')}>
                                <p>7d</p>
                                <p className={'extra-row'}>{Parser.diff(totalDiff7d)}</p>
                                <p className={'extra-row diff-worth'}>{Parser.worth(totalWorth7d)}</p>
                            </th>
                            <th className={c.ma} onClick={co('marketCapUsd')}>Market Cap</th>
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