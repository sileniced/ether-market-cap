import React, { Component } from 'react'
import Parser from "../../../services/Parser";

class TokenHeader extends Component
{
    render() {

        const { totalWorth, totalEth, totalWorth24h, totalWorth7d, totalDiff, totalDiff7d } = this.props.total;
        const co = this.props.changeOrder;
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
            <thead>

            <tr className={'row-header'}>
                <th className={c.na} colSpan={2}>Token</th>
                <th className={c.ba} onClick={co('balance')}>Balance</th>
                <th onClick={co('balance')}/>
                <th className={c.sh} onClick={co('worth')}>Share</th>
                <th className={c.ra} onClick={co('rate')}>Rate</th>
                <th className={c.wo} onClick={co('worth')}>
                    <p>Worth</p>
                    <p className={'extra-row'}>{Parser.worth(totalWorth)}</p>
                    <p className={'extra-row diff-worth'}>{Parser.worthETH(totalEth)}</p>
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
        )
    }
}

export default TokenHeader