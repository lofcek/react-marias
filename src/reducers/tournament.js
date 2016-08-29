import * as Action from './actions'
import Immutable from 'immutable'

const initialState = Immutable.fromJS({
    name: "O pohar starostu Chropova",
    date: Date.UTC(2017, 1, 5)
})

export default function tourReducer(state = initialState, action) {
    switch(action.type) {
    case Action.TOURNAMENT_CHANGE:
        return state.set(action.payload.index, Immutable.fromJS(action.payload.tournament))
    default:
        return state
    }
}