import React, { Component } from 'react';

import ListHeader from "./ListHeader";
import ListRow from "./ListRow";
import ListNoPriceRow from "./ListNoPriceRow";

class List extends Component
{
    render ()
    {
        const {  changeOrder, list } = this.props;
        const { total, sorted, tokens } = list;

        return (
            <div className="table-responsive">
                <table className="table">
                    <ListHeader total={total} changeOrder={changeOrder} />
                    {sorted.map((token) => <ListRow key={token.key} token={token}/>)}
                    {tokens.noPrice.map((token) => <ListNoPriceRow key={token.key} token={token}/>)}
                </table>
            </div>
        )
    }
}

export default List