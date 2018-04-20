import React, { Component } from 'react';
import Parser from "../../../services/Parser";

class SellForm extends Component
{
    render()
    {

        const onAmountChange = this.props.onAmountChange;

        return (
            <div id={'sell-form'}>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Amount {Parser.getSymbol()}</label>
                        <input
                            type="text"
                            pattern="\d*"
                            className="form-control"
                            id="sell-form-amount"
                            placeholder="Enter amount"
                            onChange={e => onAmountChange(e.target.value)}
                        />
                    </div>
                </form>
            </div>
        )
    }
}
export default SellForm