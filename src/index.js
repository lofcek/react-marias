import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import { Provider } from 'react-redux';
import create from './store';
//import Immutable from 'immutable';
import playersReducer from './reducers/player'
import tournamentReducer from './reducers/tournament'
import {playerAppend, playerChange} from './reducers/actions'

const reducers = {
  players: playersReducer,
  tournament: tournamentReducer
};

const store = create(reducers, {});
//console.log(playerAppend('Karol Stvrty', 'Plavecky Stvrtok'))
store.dispatch(playerAppend('Karol Stvrty', 'Plavecky Stvrtok'));
store.dispatch(playerChange(1, {club: 'aaa'}));

ReactDOM.render(
   <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);
