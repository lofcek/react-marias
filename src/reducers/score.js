import * as Actions from './actions';
import Immutable from 'immutable';
import _ from 'lodash';

let initialState = Immutable.fromJS({
  money_str: [],
  money_float: [],
  points: [],
  rule: {
    points0: true,
    preferMoney: false
  }
})

function computePoints(pts, rulePoints0) {
  const arr = [pts.get(0), pts.get(1), pts.get(2)]
  if (!_.every(arr, _.isFinite))
    return [null, null, null]
  return _.map(arr, x=> _.sum(_.map(arr, n => (x===0 && rulePoints0) ? 0 :(x > n) + (x >= n))))
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
      if(Number.isNaN(m)) {
        m = Number(money.replace(',', '.'))
      }
      if(money.trim() === '')
        m = null;
      state = state.setIn(['money_float', round, table, player], _.isFinite(m) ? m: null)
      state = state.setIn(['points', round, table], Immutable.fromJS(computePoints(state.getIn(['money_float', round, table]), state.get('rule').get('points0'))))
      //console.log("money_str", JSON.stringify(state.get('money_str')))
      //console.log("money_float", JSON.stringify(state.get('money_float')))
      return state
    case Actions.SET_RULE:
      state = state.update('rule', r => r.merge(Immutable.fromJS(action.payload)))
      let points = state.get('points')
      state.get('money_float').forEach(
        (round, r) => round.forEach(
          (table, t) => {
            points= points.setIn([r,t], Immutable.fromJS(computePoints(state.getIn(['money_float', r, t]), state.get('rule').get('points0'))))
            }))
      //console.log('rule = ', JSON.stringify(state.get('rule')))
      state = state.set('points', points)
      return state
    default:
      return state
  }
}
