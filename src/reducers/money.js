import * as Actions from './actions';
import Immutable from 'immutable';

let initialState = Immutable.fromJS({
  money_str: {},
  money_float: {}
})

export default function moneyReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.MONEY_CHANGE:
      const {round, table, player,money} = action.payload;
      state = state.setIn(['money_str', round, table, player], money)
      let m = Number(money);
      if(isNaN(m)) {
        m = Number(money.replace(',', '.'))
      }
      state = state.setIn(['money_float', round, table, player], m)
      //console.log(JSON.stringify(state.get('money_float')))
      return state
    default:
      return state
  }
}
