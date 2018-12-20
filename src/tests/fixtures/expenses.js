import moment from 'moment'

const threeDaysLater = moment(0).add(3, 'days')
const fiveDaysLater = moment(0).add(5, 'days').valueOf()
const sevenDaysLater = moment(0).add(7, 'days')
const tenDaysLater = moment(0).add(10, 'days').valueOf()

export const expenses = [
    {
        id: 1,
        description: 'Gum',
        note: '',
        amount: 195,
        createdAt: 0
    },
    {
        id: 2,
        description: 'Rent',
        note: '',
        amount: 500,
        createdAt: fiveDaysLater
    },
    {
        id: 3,
        description: 'Gum book',
        note: '',
        amount: 300,
        createdAt: tenDaysLater
    },
]