import React from 'react'
import './Total.css'
import { CostContext } from '../../context'

export class Total extends React.Component {
    sum = (a, b) => parseFloat(a) + parseFloat(b)

    sumAmount = (costs) => costs
        .map(cost => cost.amount)
        .reduce(this.sum)

    render() {
        return <CostContext.Consumer>
                {({costs, getFilteredCosts, payerFilter}) => {
                    const filteredCosts = getFilteredCosts() 
                    return (
                        <div className="total">
                            <label>Total expenses : <span>{filteredCosts.length}</span></label>
                            <div className="amounts">
                                { payerFilter && this.sumAmount(filteredCosts) + '€' }
                                <span>{this.sumAmount(costs)} €</span>
                            </div>
                        </div>
                    )
                }}
            </CostContext.Consumer>
    }
}

export default Total
