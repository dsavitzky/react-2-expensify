import { createStore } from 'redux'

const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
})

const decrementCount = ({ decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
})

const resetCount = () => ({
    type: 'RESET'
})

const setCount = ({ newCount = 1 } = {}) => ({
    type: 'SET',
    newCount
})

const countReducer = (state = { count: 0 }, action) => {

    const { count } = state
    const { incrementBy, decrementBy, type, newCount } = action

    switch (type) {
        case 'INCREMENT':
            return {
                count: count + incrementBy
            }
        case 'DECREMENT':
            return {
                count: count - decrementBy
            }
        case 'RESET':
            return {
                count: 0
            }
        case 'SET':
            return {
                count: newCount
            }
        default:
            return state
    }
}

const store = createStore(countReducer)

const unsubscribe = store.subscribe(() => console.log(store.getState()))

store.dispatch(incrementCount({ incrementBy: Math.floor(Math.random() * 10) }))

store.dispatch(incrementCount())

store.dispatch(decrementCount({ decrementBy: Math.floor(Math.random() * 10) }))

store.dispatch(decrementCount())

store.dispatch(resetCount())

store.dispatch(setCount({ newCount: 101 }))