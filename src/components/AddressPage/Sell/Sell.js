import React, { Component } from 'react';
import './Sell.css';
import SellForm from "./SellForm";
import SellHeader from "./SellHeader";
import SellRow from "./SellRow";
import Parser from "../../../services/Parser";

class Sell extends Component
{

    constructor (props)
    {
        super(props);

        this.state = {
            sellAmount: 0,
            tokens: props.tokens,
            checkedTokens: 0
        }
    }

    render () {

        const { tokens, sellAmount, checkedTokens } = this.state;

        const onAmountChange = (val) => this.setState({sellAmount: val / Parser.getValue()});
        const onCheckboxChange = (isChecked) => this.setState({checkedTokens: ((isChecked) ? (checkedTokens + 1) : (checkedTokens - 1))});

        return (
            <div>
                <SellForm onAmountChange={onAmountChange}/>
                <div className="table-responsive">
                    <table className="table">
                        <SellHeader />
                        <tbody>
                        {tokens.map((token) => <SellRow
                            key={token.key}
                            token={token}
                            onCheckboxChange={onCheckboxChange}
                            sellAmount={sellAmount / checkedTokens}
                        />)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default Sell