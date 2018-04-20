import React, { Component } from 'react';

import TokenRow from "./TokenRow";
import TokenRowNoPrice from "./TokenRowNoPrice";
import TokenHeader from "./TokenHeader";

class ShowList extends Component
{
    render ()
    {
        const { total, changeOrder, sorted, tokens } = this.props;
        return (
            <table className="table">
                <TokenHeader total={total} changeOrder={changeOrder} />
                {sorted.map((token) => <TokenRow key={token.key} token={token}/>)}
                {tokens.noPrice.map((token) => <TokenRowNoPrice key={token.key} token={token}/>)}
            </table>
        )
    }
}

export default ShowList