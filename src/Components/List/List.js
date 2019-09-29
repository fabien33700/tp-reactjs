import React from 'react'
import { connect } from 'react-redux'
import { ListItem } from '../ListItem/ListItem'
import './List.css'

export class List extends React.Component {
    getFilteredCosts = () => {
        return this.props.costs
            .filter(cost => {
                const payer = this.props.payer
                return !payer || cost.paidBy === payer
            })
    }
    render() {
        return (
            // <CostContext.Consumer>
                // {({ getFilteredCosts }) => {
                    // const costs = getFilteredCosts()
                    // return (
                        <div className="table">
                            {this.getFilteredCosts().map((item, i) =>
                                <ListItem item={item} key={i} />
                            )}
                        </div>
                    // )
                // }}
            
        )
    }
}

const mapStateToProps = state => ({
    costs: state.costs,
    payer: state.payer
})

export default connect(mapStateToProps)(List);
