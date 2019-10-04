import React from 'react'
import './Total.css'
import { connect } from 'react-redux'

export class Total extends React.Component {
    sum = (a, b) => parseFloat(a) + parseFloat(b)

    sumAmount = (costs) => costs
        .map(cost => cost.amount)
        .reduce(this.sum, 0)

    getFilteredCosts = () => {
        return this.props.costs
            .filter(cost => {
                const payer = this.props.payer
                return !payer || cost.paidBy === payer
            })
    }

    render() {
        const filteredCosts = this.getFilteredCosts()
        const { costs, payer } = this.props
        return (
            <div className="total">
                <label>Total expenses : <span>{filteredCosts.length}</span></label>
                <div className="amounts">
                    {payer && this.sumAmount(filteredCosts) + '€'}
                    <span>{this.sumAmount(costs)} €</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    costs: state.costs.value,
    payer: state.payer
})

export default connect(mapStateToProps)(Total)
