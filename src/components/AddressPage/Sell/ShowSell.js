import React, { Component } from 'react';
import './ShowSell.css';

class ShowSell extends Component
{
    render () {
        return (
            <div>
                <div id={'sell-form'}>
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Amount</label>
                            <input type="text" className="form-control" id="sell-form-amount" placeholder="Enter amount" />
                        </div>
                    </form>
                </div>
                <table className="table">

                </table>
            </div>
        )
    }
}
export default ShowSell