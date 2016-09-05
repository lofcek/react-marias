import * as Actions from './actions'
import Immutable from 'immutable'

let initialState = Immutable.fromJS({
  round: [
  ]
})

export default function drawReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.MAKE_FIXED_DRAW:
      const { round, numPlayers} = action.payload;
      const numTables = numPlayers / 3;

      let tables = [];
      let normalize = n => { while (n < 0) n += numTables; return n % numTables; }
      for (let i = 0; i < numTables; i++) {
        tables.push([
          normalize(i - round),
          normalize(i) + numTables,
          normalize(i + round) + 2 * numTables,
        ])
      }
      tables = Immutable.fromJS(tables);
      if (round === state.get('round').size) {
        return state.update('round', r => r.push(tables))
      }
      return state.setIn(['round', round], tables);
    default:
      return state
  }
}