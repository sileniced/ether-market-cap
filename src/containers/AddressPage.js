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
                    allTokens.push(Parser.ETH_asToken(addressInfo, tokenInfo[0]));
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
                        return null;
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

        const {totalWorth, totalDiff, totalWorth24h, totalWorth7d, totalDiff7d, hasPrice} = Calc.initCalc(tokens.hasPrice);

        tokens['hasPrice'] = hasPrice;

        const sorted = Sorter.sorter(tokens.hasPrice, 'worth', 'DESC');
        const sortedCache = {worth: sorted};

        this.setState( {
            isLoaded: true,
            addressInfo,
            totalWorth,
            totalWorth24h,
            totalWorth7d,
            totalDiff,
            totalDiff7d,
            tokens,
            sorted,
            sortedCache
        });
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

        const { error, isLoaded, totalWorth, totalWorth24h, totalWorth7d, totalDiff, totalDiff7d, sorted, tokens } = this.state;


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
                                onClick={() => this.changeOrder('diff', 'ASC')}>
                                <p>{Parser.diff(totalDiff)}</p>
                                <p className={'diff-worth'}>{Parser.worth(totalWorth24h)}</p>
                                </th>
                            <th className={"header-diff7d " + Parser.diffColor(totalDiff7d)}
                                onClick={() => this.changeOrder('diff7d', 'ASC')}>
                                <p>{Parser.diff(totalDiff7d)}</p>
                                <p className={'diff-worth'}>{Parser.worth(totalWorth7d)}</p>
                                </th>
                            <th className={"header-market text-right"}
                                onClick={() => this.changeOrder('marketCapUsd', 'ASC')} >Market Cap</th>
                        </tr>
                        </thead>
                        {sorted.map((token, key) => (
                            <TokenRow key={key} token={token} />
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