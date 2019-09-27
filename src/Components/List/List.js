import React from 'react'
import { ListItem } from '../ListItem/ListItem'
import './List.css'
import { CostContext } from '../../context';

export class List extends React.Component {
    render() {
        return (
            <CostContext.Consumer>
                {({ getFilteredCosts }) => {
                    const costs = getFilteredCosts()
                    return (
                        <div className="table">
                            {costs.map((item, i) =>
                                <ListItem item={item} key={i} />
                            )}
                        </div>
                    )
                }}
            </CostContext.Consumer>
        )
    }
}

export default List
