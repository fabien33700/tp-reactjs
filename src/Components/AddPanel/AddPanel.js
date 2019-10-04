import React from 'react'
import { InputGroup, FormControl, Button, Form, Col } from 'react-bootstrap'
import { TiPlus } from 'react-icons/ti'
import { connect } from 'react-redux'
import './AddPanel.css'

export class AddPanel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            paidBy: '',
            amount: 0.0
        }
    }

    handleAmountChange = (e) => {
        this.setState({ amount: e.target.value })
    }

    handleTitleChange = (e) => {
        this.setState({ title: e.target.value })
    }

    handlePayerSelect = (e) => {
        this.setState({ paidBy: e.target.value })
    }

    isAddEnabled = () => {
        return Object.values(this.state).every(v => v) &&
            !isNaN(parseFloat(this.state.amount)) && this.state.amount > 0
    }

    render() {
        const { users, handleAddCost } = this.props
        return (
            <div className="add-panel">
                <Form >
                    <Form.Row>
                        <Col>
                            <InputGroup size="sm">
                                <FormControl placeholder="What ?" onChange={this.handleTitleChange} />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup size="sm">
                                <Form.Control
                                    as="select"
                                    defaultValue=""
                                    onChange={this.handlePayerSelect}>
                                    <option value="" disabled>Who ?</option> {
                                        users.map((user, i) => {
                                            return <option key={i} value={user}>{user}</option>
                                        })
                                    }
                                </Form.Control>
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup size="sm">
                                <FormControl type="number"
                                    value={this.state.amount}
                                    onChange={this.handleAmountChange} />
                                <InputGroup.Append>
                                    <Button variant="primary"
                                        onClick={() => handleAddCost(this.state)}
                                        disabled={!this.isAddEnabled()}>
                                        <TiPlus />
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Form.Row>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    users: state.users.value
})

const mapDispatchToProps = dispatch => {
    return {
        handleAddCost: cost => {
            // TODO
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPanel);
