import React from 'react';
import './DiffColor.css';

class Parser
{
    static logo (cryptoCompare)
    {
        if (cryptoCompare !== false) {
            return <img className={'logo'} src={"https://www.cryptocompare.com" + cryptoCompare.ImageUrl} />
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
        return "$ " + parseFloat(worth.toFixed(2)).toLocaleString(undefined, {minimumFractionDigits: 2});
    }

    static rate (rate)
    {
        return "$ " + parseFloat(rate).toLocaleString(undefined, {minimumFractionDigits: 4, maximumFractionDigits: 4});
    }

    static marketCapUsd (marketCapUsd)
    {
        const parsed = parseInt(marketCapUsd, 10);

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

        return isNaN(parsed) ? '-' : "$ " + short.toLocaleString();
    }

    static share (share)
    {
        return share.toFixed(2) + "%";
    }

    static diff (diff)
    {
        return diff.toFixed(2) + "%";
    }

    static diff7d (diff7d)
    {
        return "(" + diff7d.toFixed(2) + "%)";
    }

    static diffColor (diff)
    {
        let diffScore = Math.floor(Math.abs(diff) / 5);
        if (diffScore > 5) diffScore = 5;
        return (diff < 0 ? 'change-negative-' : 'change-positive-') + diffScore;
    }
}

export default Parser