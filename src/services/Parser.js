import React from 'react';
import './DiffColor.css';

class Parser
{

    static setCurrency(currency)
    {
        this.value = parseFloat(currency.value);
        this.symbol = currency.symbol;
    }

    static logo (cryptoCompare)
    {
        if (cryptoCompare !== false) {
            return <img alt={cryptoCompare.FullName} className={'logo'} src={"https://www.cryptocompare.com" + cryptoCompare.ImageUrl} />
        }

        return <div className={'logo-32'} />
    }

    static name (name)
    {
        return name

    }

    static balance (balance)
    {
        return balance.toLocaleString();
    }

    static worth (worth)
    {
        return this.symbol + " " + parseFloat((worth * this.value).toFixed(2)).toLocaleString(undefined, {minimumFractionDigits: 2});
    }

    static rate (rate)
    {
        return this.symbol + " " + (parseFloat(rate) * this.value).toLocaleString(undefined, {minimumFractionDigits: 4, maximumFractionDigits: 4});
    }

    static marketCapUsd (marketCapUsd)
    {
        const parsed = parseInt(marketCapUsd, 10) * this.value;

        let short = 0;

        if ( parsed > Math.pow(10, 9) ) {
            short = (parsed / Math.pow(10, 9)).toLocaleString(undefined, {minimumFractionDigits: 3}) + " Bn";
        } else if ( parsed > Math.pow(10, 6) ) {
            short = (parsed / Math.pow(10, 6)).toLocaleString(undefined, {minimumFractionDigits: 3}) + " MM";
        } else if ( parsed > Math.pow(10, 3) ) {
            short = (parsed / Math.pow(10, 3)).toLocaleString(undefined, {minimumFractionDigits: 3}) + " K";
        } else {
            short = parsed;
        }

        return isNaN(parsed) ? '-' : this.symbol + " " + short.toLocaleString();
    }

    static share (share)
    {
        return share.toFixed(2) + "%";
    }

    static diff (diff)
    {
        return diff.toFixed(2) + "%";
    }

    static diffColor (diff)
    {
        let diffScore = Math.floor(Math.abs(diff) / 5);
        if (diffScore > 5) diffScore = 5;
        return (diff < 0 ? 'change-negative-' : 'change-positive-') + diffScore;
    }

    static ETH_asToken (addressInfo ,tokenInfo) {
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

}

export default Parser