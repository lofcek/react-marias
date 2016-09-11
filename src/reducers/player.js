import * as Actions from './actions';
import Immutable from 'immutable';

const PLAYER_MAX = 150;

let initialState = Immutable.fromJS({
  
  list: [
    { name: 'Jozko Mrkvicka', club: 'Najvacsia diera' },
    { name: 'Janko Hrasko', club: 'Prievidza' },
    { name: 'Karol Stvrty', club: 'Plavecky Stvrtok' },
    { name: 'Adam  Prvy', club: 'Eden' },
    { name: 'Peter Druhy Sagan', club: 'TinkOn' },
    { name: 'Volakto  Treri', club: '' },
    { name: 'Vasek IV', club: 'AC Praha' },
    { name: 'Karol V', club: 'FC Sevilla' },
    { name: 'ABC ', club: 'def' }
  ]
})
initialState = initialState.set('listCnt', initialState.get('list').size)
while (initialState.get('list').size < PLAYER_MAX)
  initialState = initialState.update('list', l => l.push(Immutable.fromJS({ name: '', club: '' })));

export default function playersReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.PLAYER_CHANGE:
      state = state.updateIn(['list', action.payload.index], (val) => val.merge(action.payload.player));
      let lastUsed = state.get('list').findLastIndex(v => v.get('name') || v.get('club'));
      state = state.set('listCnt', lastUsed + 1);
      return state
    default:
      return state
  }
}