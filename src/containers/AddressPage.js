import React, { Component } from 'react';

import TokenRow from '../components/TokenRow';
import TokenRowNoPrice from "../components/TokenRowNoPrice";
import Parser from '../services/Parser';
import Sorter from '../services/Sorter';
import Calc from "../services/Calc";

class AddressPage extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            addressInfo: {},
            totalWorth: 0,
            totalDiff: 0,
            totalDiff7d: 0,
            tokens: [],
            sorted: [],
            sortedCache: {}
        };
    }

    // componentDidMount() {
    //     Promise.all([
    //         fetch('https://api.ethplorer.io/getAddressInfo/' + this.props.address + '?apiKey=freekey'),
    //         fetch('https://api.coinmarketcap.com/v1/ticker/ethereum/'),
    //         fetch('https://min-api.cryptocompare.com/data/all/coinlist')
    //     ])
    //         .then(([addressInfo, tokeninfo, allCoins]) => console.log([addressInfo, tokeninfo, allCoins]))
    //         .catch(err => console.log(err))
    // }

    componentDidMount() {
        fetch('https://api.ethplorer.io/getAddressInfo/' + this.props.address + '?apiKey=freekey')
            .then(res => res.json())
            .then(
                (addressInfo) => {

                    if (addressInfo.error === undefined) {

                        let allTokens = addressInfo.tokens;
                        this.getEtherInfo(allTokens, addressInfo);

                    } else {
                        const { error } = addressInfo;
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    getEtherInfo(allTokens, addressInfo) {
        fetch('https://api.coinmarketcap.com/v1/ticker/ethereum/')
            .then(res => res.json())
            .then(
                (tokenInfo) => {
                    allTokens.push(this.ETH_asToken(addressInfo, tokenInfo[0]));
                    this.getCryptoCompareInfo(allTokens, addressInfo);
                },
                (error) => {
                    this.setState( {
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    getCryptoCompareInfo(allTokens, addressInfo) {
        fetch('https://min-api.cryptocompare.com/data/all/coinlist')
            .then(res => res.json())
            .then(
                (allCoins) => {
                    allTokens.map(token => {
                        const coinData = allCoins.Data[token.tokenInfo.symbol];
                        token['cryptoCompare'] = coinData === undefined ? false : coinData;
                    });
                    this.completeMount(allTokens, addressInfo);
                },
                (error) => {
                    this.setState( {
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    completeMount(allTokens, addressInfo) {
        const tokens = Sorter.placer(allTokens);

        const {totalWorth, totalDiff, totalDiff7d, hasPrice} = Calc.initCalc(tokens.hasPrice);

        tokens['hasPrice'] = hasPrice;

        const sorted = Sorter.sorter(tokens.hasPrice, 'worth', 'DESC');
        const sortedCache = {worth: sorted};

        this.setState( {
            isLoaded: true,
            addressInfo,
            totalWorth,
            totalDiff,
            totalDiff7d,
            tokens,
            sorted,
            sortedCache
        });
    }

    ETH_asToken (addressInfo ,tokenInfo) {
        return {
            balance: addressInfo.ETH.balance * Math.pow(10, 18),
            tokenInfo: {
                address: "0x",
                decimals: 18,
                name: "Ethereum",
                owner: "0x",
                price: {
                    availableSupply: null,
                    currency: "USD",
                    diff: parseFloat(tokenInfo.percent_change_24h),
                    diff7d: parseFloat(tokenInfo.percent_change_7d),
                    marketCapUsd: tokenInfo.market_cap_usd,
                    rate: tokenInfo.price_usd,
                    ts: null,
                    volume24h: tokenInfo['24h_volume_usd']
                },
                symbol: "ETH"
            },
            totalIn: addressInfo.ETH.totalIn * Math.pow(10, 18),
            totalOut: addressInfo.ETH.totalOut * Math.pow(10, 18),
        }
    }


    changeOrder(key, order) {
        if (this.state.sortedCache[key] === undefined) {
            const sorted = Sorter.sorter(this.state.tokens.hasPrice, key, order);
            let sortedCache = this.state.sortedCache;
            sortedCache[key] = sorted;

            this.setState({
                sorted,
                sortedCache
            })

        } else {
            const sorted = this.state.sortedCache[key];
            if (order === 'ASC') sorted.reverse();

            this.setState({
                sorted
            })
        }
    }

    render() {

        const { error, isLoaded, totalWorth, totalDiff, totalDiff7d, sorted, tokens } = this.state;


        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {

            return (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th className={"extra-row"} colSpan={6} />
                            <th className={"extra-worth text-right"}>worth</th>
                            <th className={"extra-diff text-right"}>24h</th>
                            <th className={"extra-diff7d"}>(7d)</th>
                        </tr>
                        <tr>
                            <th className={"header-name"} colSpan={2}>Token</th>
                            <th className={"header-balance text-right"}
                                onClick={() => this.changeOrder('balance', 'ASC')}      >Balance</th>
                            <th />
                            <th className={"header-share text-right"}
                                onClick={() => this.changeOrder('worth', 'ASC')}        >Share</th>
                            <th className={"header-rate text-right"}
                                onClick={() => this.changeOrder('rate', 'ASC')}         >Rate</th>
                            <th className={"header-worth text-right"}
                                onClick={() => this.changeOrder('worth', 'ASC')}        >{Parser.worth(totalWorth)}</th>
                            <th className={"header-diff text-right " + Parser.diffColor(totalDiff)}
                                onClick={() => this.changeOrder('diff', 'ASC')}         >{Parser.diff(totalDiff)}</th>
                            <th className={"header-diff7d " + Parser.diffColor(totalDiff7d)}
                                onClick={() => this.changeOrder('diff7d', 'ASC')}       >{Parser.diff7d(totalDiff7d)}</th>
                            <th className={"header-market text-right"}
                                onClick={() => this.changeOrder('marketCapUsd', 'ASC')} >Market Cap</th>
                        </tr>
                        </thead>
                        {sorted.map(token => (
                            <TokenRow key={token.tokenInfo.symbol} token={token} />
                        ))}
                        {tokens.noPrice.map(token => (
                            <TokenRowNoPrice key={token.tokenInfo.symbol} token={token} />
                        ))}
                    </table>
                </div>
            );
        }
    }
}

export default AddressPage