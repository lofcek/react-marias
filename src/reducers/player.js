import * as Action from './actions'
import Immutable from 'immutable'

const initialState = Immutable.fromJS( [
    {name: "Jozko Mrkvicka", club: "Najvacsia diera"},
    {name: "Janko Hrasko", club: "Prievidza"}
])

export default function playersReducer(state = initialState, action) {
    console.log("playersReducer action")
    console.log(action)
    console.log(state.toJS())
    
    switch(action.type) {
    case Action.PLAYER_CHANGE:
        state = state.update(action.payload.index, (val) => val.merge(action.payload.player))
        console.log(state)
        return state
    case Action.PLAYER_APPEND:
        state = state.push(Immutable.fromJS(action.player))
        console.log(state.toJS())
        return state
    default:
        return state
    }
}