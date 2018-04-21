import React, { Component } from 'react';

class ShowNav extends Component
{
    render()
    {

        const { changeShow, show } = this.props;
        const showButtonClass = (showClass) => {
            return ((showClass === show) ? 'nav-active' : 'nav-show') + ' nav-link btn btn-link';
        };

        return (
            <ul className="nav">
                <li className="nav-item">
                    <button type="button" className={showButtonClass('list')} onClick={changeShow('list')}>List</button>
                </li>
                <li className="nav-item">
                    <button type="button" className={showButtonClass('sell')} onClick={changeShow('sell')}>Sell</button>
                </li>
            </ul>
        )
    }
}

export default ShowNav