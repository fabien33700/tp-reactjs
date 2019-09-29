import React from 'react'
import './ListItem.css'

export class ListItem extends React.Component {

    render() {
        return (
            <div className="list-row">
                <div className="cell title">{this.props.item.title}</div>
                <div className="cell paid-by">{this.props.item.paidBy}</div>
                <div className="cell amount">{this.props.item.amount.toFixed(1)}</div>
            </div>
        )
    }
}

export default ListItem
