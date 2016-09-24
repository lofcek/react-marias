import * as Actions from './actions';
import Immutable from 'immutable';
import _ from 'lodash';

let initialState = Immutable.fromJS({
  round: [
  ],
  edited: {
    round: null,
    table: null,
    player: null,
    text: ''
  }
})

export default function drawReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.FOCUS_DRAW:
      return state.set('edited', Immutable.fromJS(action.payload))
    case Actions.EDIT_DRAW:
      let val = _.toNumber(action.payload.text)-1;
      if (!_.isFinite(val) || !_.isInteger(val) || val < 0 || val >= 3*state.get('round').size )
        val = null;
      state = state.setIn([
        'round',
        state.getIn(['edited', 'round']),
        state.getIn(['edited', 'table']),
        state.getIn(['edited', 'player'])],
        val
      ).setIn(['edited', 'text'], action.payload.text)
      return state
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