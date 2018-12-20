export const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})

export const sortBy = (key = 'date') => ({
    type: 'SORT_BY',
    key
})

export const setDate = (which = 'startDate', date) => ({
    type: 'SET_DATE',
    which,
    date
})