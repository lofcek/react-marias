import * as Actions from './actions'
import Immutable from 'immutable'


const initialState = Immutable.fromJS({
    screen: Actions.ACTIVE_SCREEN_TOUR,
})

export default function activeScreenReducer(state = initialState, action) {
    switch(action.type) {
    case Actions.ACTIVE_SCREEN_CHANGE:
        return state.set('screen', action.payload.screen)
    default:
        return state
    }
    //console.log("activeScreenReducer state = "+JSON.stringify(state) )
}