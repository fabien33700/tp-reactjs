import React from 'react'
import { InputGroup, Form } from 'react-bootstrap'
import { CostContext } from '../../context'
import './Header.css'

export class Header extends React.Component {

    render() {
        return (
            <CostContext.Consumer>
                {({ title, users, setFilter }) =>
                    <div className="header">
                        <h1>{title}</h1>
                        <InputGroup size="sm">
                            <Form.Control as="select" defaultValue=""
                                onChange={e => setFilter(e.target.value)}>
                                <option value="">Tous</option>
                                {
                                    users.map((user, i) => {
                                        return <option key={i} value={user}>{user}</option>
                                    })
                                }
                            </Form.Control>
                        </InputGroup>

                    </div>
                }
            </CostContext.Consumer>
        )
    }
}

export default Header
