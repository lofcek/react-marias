import * as Actions from './actions'
import Immutable from 'immutable'

const PLAYER_MAX = 150;

let initialState = Immutable.fromJS( {
    list_cnt: 3,
    list: [
        {name: 'Jozko Mrkvicka', club: 'Najvacsia diera'},
        {name: 'Janko Hrasko', club: 'Prievidza'},
        {name: 'Karol Stvrty', club: 'Plavecky Stvrtok'},
    ]
})
while(initialState.get('list').size < PLAYER_MAX)
    initialState = initialState.update('list', l => l.push(Immutable.fromJS({name: '', club: ''})));

export default function playersReducer(state = initialState, action) {
    switch(action.type) {
    case Actions.PLAYER_CHANGE:
        state = state.updateIn(['list', action.payload.index], (val) => val.merge(action.payload.player));
        let lastUsed = state.get('list').findLastIndex(v => v.get('name') || v.get('club'));
        state = state.set('list_cnt', lastUsed+1 );
        return state
    default:
        return state
    }
}