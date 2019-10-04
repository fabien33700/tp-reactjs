import rp from 'request-promise'

const BASE_URL = 'http://localhost:3000/api/'

function fetchAll(uri, qs = {}) {
    return rp({ 
        uri: BASE_URL + uri, 
        qs, 
        json: true
    })
    .catch(err => console.log(err))
}

function post(uri, body = {}) {
    return rp({
        uri: BASE_URL + uri,
        body,
        json: true,
        method: 'post'
    })
}

export const postCost = (cost) => post("costs", cost)
export const fetchUsers = () => fetchAll("users")
export const fetchCosts = (paidBy = {}) => fetchAll("costs", { paidBy })
