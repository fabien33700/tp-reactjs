import React from 'react'
import List from '../List/List'
import AddPanel from '../AddPanel/AddPanel'
import Header from '../Header/Header'
import Total from '../Total/Total'
import { users, costs } from '../../Services/mock.js'
import { CostContext } from '../../context'
import './App.css'

export class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users,
            costs,
            title: 'Integration Week-end',
            payerFilter: "",
            addCost: this.addCost,
            setFilter: this.setFilter,
            getFilteredCosts: this.getFilteredCosts
        }
    }
    setFilter = (user) => {
        this.setState(state => state.payerFilter = user)
    }
    addCost = (cost) => {
        this.setState(state => state.costs.push({
            ...cost, amount: parseFloat(cost.amount)
        }))
    }
    getFilteredCosts = () => {
        return this.state.costs.filter(item => 
            !this.state.payerFilter || 
            item.paidBy === this.state.payerFilter)
    }
    render() {
        return <CostContext.Provider value={this.state}>
            <section className="app">
                <article>
                    <Header />
                </article>
                <article className="expand" >
                    <List />
                </article>
                <article>
                    <AddPanel />
                </article>
                <article>
                    <Total />
                </article>
            </section>
        </CostContext.Provider>
    }
}

export default App;
