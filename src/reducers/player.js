import * as Action from './actions'
import Immutable from 'immutable'

const initialState = Immutable.fromJS( [
    {name: 'Jozko Mrkvicka', club: 'Najvacsia diera'},
    {name: 'Janko Hrasko', club: 'Prievidza'},
    {name: 'Karol Stvrty', club: 'Plavecky Stvrtok'},
    {name: '', club: ''}
])

export default function playersReducer(state = initialState, action) {
    switch(action.type) {
    case Action.PLAYER_CHANGE:
        state = state.update(action.payload.index, (val) => val.merge(action.payload.player));
        let len =  state.size-1;
        if (action.payload.index === len && (state.getIn([len, 'name']) !== '' || state.getIn([len, 'club']) !== '')) {
            // Last item is not empty, therefore we add an empty one at the end
            state = state.push(Immutable.fromJS({name: '', club: ''}));
        } else {
            // where there are some empty position, we remove them (only one should be there all the time)
            // therefore algorithm is: while last two lines are empty, pop last one
            while( len >=1 && state.getIn([len, 'name']) === '' && state.getIn([len, 'club']) === '' &&
                state.getIn([len-1, 'name']) === '' && state.getIn([len-1, 'club']) === '') {
                len--;
                state = state.pop();
            }
        }
        return state
    default:
        return state
    }
}