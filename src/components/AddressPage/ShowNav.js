import React, { Component } from 'react';

class ShowNav extends Component
{
    render()
    {

        const changeShow = this.props.changeShow;
        const showButtonClass = (show) => {
            return 'nav-link btn btn-link' + ((show === this.props.show) && ' disabled');
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