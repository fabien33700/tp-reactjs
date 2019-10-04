const express = require('express')
const app = express();
app.use(express.json())

const PORT = 4000 // process.env.PORT

const { users, costs } = require ('./data')


app.get('/api/users', (_req, res) => res.json(users))

app.get('/api/costs', (req, res) => {
    const paidBy = req.query.paidBy
    res.json(costs.filter(c => !paidBy || c.paidBy === paidBy))
})

app.post('/api/users', (req, res) => {
    if (!req.body || !req.body.name) {
        return error(res, 400, 'You must provide a JSON containing "name" value')
    }
    const name = req.body.name
    if (userExists(name)) {
        return error(res, 409, `A user called "${name}" already exists !`)
    }
    users.push(name)
    res.status(201).end()
})

function error(response, code, message) {
    response.status(code).json({
        message
    })
    return undefined
}

function userExists(name) {
    return users.map(u => u.toLowerCase()).indexOf(name.toLowerCase()) > -1
}

app.post('/api/costs', (req, res) => {
    if (!req.body || !['title', 'paidBy', 'amount'].every(k => req.body[k])) {
        return error(res, 400, 'You must provide a JSON containing "title", "paidBy" and "amount"')
    }

    const amount = parseFloat(req.body.amount) || 0
    if (amount <= 0.0) {
        return error(res, 400, "Amount must be a positif non-zero value.")
    }
    const paidBy = req.body.paidBy
    if (!userExists(paidBy)) {
        return error(res, 404, `The payer "${paidBy}" does not exist.`)
    }

    costs.push({
        title: req.body.title,
        paidBy, amount
    })
    res.status(201).end()
})


app.listen(PORT, () =>
    console.log(`Example app listening on port ${PORT}!`),
)
