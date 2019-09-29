// Actions constants
export const ADD_COST = 'ADD_COST'
export const RENAME_LIST = 'RENAME_LIST'
export const FILTER_BY_PAYER = 'FILTER_BY_PAYER'

// Actions creators
export const addCost = (paidBy, title, amount) => ({
    type: ADD_COST,
    cost: { paidBy, title, amount }
})

export const renameList = (title) => ({
    type: RENAME_LIST,
    title
})

export const filterByPayer = (payer) => ({
    type: FILTER_BY_PAYER,
    payer
})
