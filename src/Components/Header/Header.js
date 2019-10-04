import React from 'react'
import { InputGroup, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import './Header.css'
import { filterByPayer } from '../../Redux/actions'

export class Header extends React.Component {
    render() {
        const { title, handleFilterByPayer, users } = this.props
        return (
            <div className="header">
                <h2>{title}</h2>
                <InputGroup size="sm">
                    <Form.Control as="select" defaultValue=""
                        onChange={e => handleFilterByPayer(e.target.value)}>
                        <option value="">Tous</option>
                        {
                            users.map((user, i) => 
                                <option key={i} value={user}>{user}</option>
                            )
                        }
                    </Form.Control>
                </InputGroup>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    users: state.users.value,
    title: state.title
})

const mapDispatchToProps = dispatch => {
    return {
        handleFilterByPayer: payer => {
            dispatch(filterByPayer(payer))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
