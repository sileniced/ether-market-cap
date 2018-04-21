import React, { Component } from 'react';

class SellHeader extends Component
{
    render()
    {
        const c = {
            na: 'header-name',
            ba: 'header-balance text-right',
            sa: 'header-sell-amount text-right',
            nb: 'header-new-balance text-right',
            wo: 'header-worth text-right',
            nw: 'header-new-worth text-right'
        };

        return (
            <thead>
            <tr>
                <th> </th>
                <th className={c.na} colSpan={2}>Token</th>
                <th className={c.ba}>Balance</th>
                <th />
                <th className={c.sa}>Sell Amount</th>
                <th />
                <th className={c.nb}>New Balance</th>
                <th />
                <th className={c.wo}>Worth</th>
                <th className={c.nw}>New Worth</th>
            </tr>
            </thead>
        )
    }
}

export default SellHeader