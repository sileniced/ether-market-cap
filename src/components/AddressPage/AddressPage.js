import React, { Component } from 'react';

import ShowNav from "./ShowNav";
import ShowList from "./List/ShowList";

import Parser from '../../services/Parser';
import Sorter from '../../services/Sorter';
import Calc from "../../services/Calc";

import * as Request from 'superagent'

import { symbols } from '../../vendors/Currencies';
import './AddressPage.css'
import ShowSell from "./Sell/ShowSell";

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
            show: 'list'
        };
    }

    componentDidMount() {

        const getBody = ([addressInfo, tokenInfo, allCoins, currency]) => {
            // console.log([addressInfo, tokenInfo, allCoins, currency]);
            return [addressInfo.body, tokenInfo.body[0], allCoins.body.Data, this.hasCurreny ? currency.body : currency];

        };

        const getError = ([addressInfo, tokenInfo, allCoins, currency]) =>
            console.log([addressInfo, tokenInfo, allCoins, currency ]);

        const parseResult = this.parseData();

        this.requests
            .then(getBody)
            .then(parseResult)
            .catch(getError)
    }

    parseData() {
        return ([addressInfo, tokenInfo, allCoins, currency]) => {

            if (addressInfo.error !== undefined) {
                this.setState({
                    isLoaded: true,
                    error: {
                        type: "address",
                        message: "this address is incomplete or it isn't an Ethereum address."
                    }
                });
                return null;
            }


            if (this.hasCurreny) {
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
                Parser.setCurrency({
                    value: currency['USD_' + this.props.currency].val,
                    symbol: symbols[this.props.currency] || ''
                });
            } else {
                Parser.setCurrency({
                    value: 1,
                    symbol: symbols['USD']
                });
            }


            let tokens = (addressInfo.tokens).concat(Parser.ETH_asToken(addressInfo, tokenInfo));

            tokens.forEach(token => {
                token['cryptoCompare'] = allCoins[token.tokenInfo.symbol] || false;
                return null;
            });

            tokens = Sorter.placer(tokens);

            const {total, hasPrice} = Calc.initCalc(tokens.hasPrice, tokenInfo.price_usd);

            tokens['hasPrice'] = hasPrice;

            const sorted = Sorter.sorter(tokens.hasPrice, 'worth');
            const sortedCache = {worth: sorted};

            this.setState({
                isLoaded: true,
                addressInfo,
                total,
                tokens,
                sorted,
                sortedCache
            });
        };
    }

    changeOrder = (order) => {
        const sortedCache = {...this.state.sortedCache};
        let sorted = [...this.state.sorted];

        if (this.state.order === order) {
            sorted.reverse();
        } else if (sortedCache[order] !== undefined) {
            sorted = sortedCache[order];
        } else {
            sorted = Sorter.sorter(this.state.tokens.hasPrice, order);
            sortedCache[order] = sorted;
        }

        return {
            order,
            sorted,
            sortedCache
        };
    };

    render() {

        // console.log(this.state)

        const { error, isLoaded } = this.state;
        if (!error && isLoaded) {

            const { total, sorted, tokens } = this.state;
            const forList = { total, sorted, tokens };

            const changeOrder = (order) => () => this.setState(this.changeOrder(order));
            const changeShow = (show) => () => this.setState({show});

            return (
                <div>

                    <ShowNav show={this.state.show} changeShow={changeShow} />

                    <div className={'address-page-container'}>

                        {(this.state.show === 'list') && <ShowList list={forList} changeOrder={changeOrder} />}
                        {(this.state.show === 'sell') && <ShowSell />}

                    </div>
                </div>
            );
        } else {
            if (!isLoaded) return <div className={'table-replace'}>Loading...</div>;
            if (error) return <div className={'table-replace'}>Error: {error.message}</div>;
        }

    }
}

export default AddressPage