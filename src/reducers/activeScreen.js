import * as Actions from './actions'
import Immutable from 'immutable'


const initialState = Immutable.fromJS({
  screen: Actions.ACTIVE_SCREEN_TOUR
})

export default function activeScreenReducer(state = initialState, action) {
  console.log(state.toJS())
  switch (action.type) {
    case Actions.ACTIVE_SCREEN_CHANGE:
      return state.merge(Immutable.fromJS(action.payload))
    default:
      return state
  }
}