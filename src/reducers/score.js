import * as Actions from './actions';
import Immutable from 'immutable';
import _ from 'lodash';

let initialState = Immutable.fromJS({
  money_str: [],
  money_float: [],
  points: []
})

function points(pts) {
  const arr = [pts.get(0), pts.get(1), pts.get(2)]
  if (_.every(arr, x=> 'number' === typeof(x)))
    return _.map(arr, x=> _.sum(_.map(arr, n => (x > n) + (x >= n))))
  return [null, null, null]
}


export default function scoreReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.MAKE_FIXED_DRAW: {
      const { round, numPlayers} = action.payload;
      const numTables = numPlayers / 3;
      if(!state.hasIn(['money_str', round])) {
          state = state.update('money_str', r => r.push(Immutable.fromJS(_.times(numTables, () => ['', '', '']))))
          state = state.update('money_float', r => r.push(Immutable.fromJS(_.times(numTables, () => [null, null, null]))))
          state = state.update('points', r => r.push(Immutable.fromJS(_.times(numTables, () => [null, null, null]))))
      }
      return state;
    }
    case Actions.MONEY_CHANGE:
      const {round, table, player,money} = action.payload;
      state = state.setIn(['money_str', round, table, player], money)
      let m = Number(money);
      if(isNaN(m)) {
        m = Number(money.replace(',', '.'))
      }
      if(money.trim() === '')
        m = null;
      state = state.setIn(['money_float', round, table, player], typeof(m)!=="number" || isNaN(m) ? null: m)
      state = state.setIn(['points', round, table], Immutable.fromJS(points(state.getIn(['money_float', round, table]))))
      return state
    default:
      return state
  }
}
