import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import { Provider } from 'react-redux';
import create from './store';
import playersReducer from './reducers/player';
import tournamentReducer from './reducers/tournament';
import drawReducer from './reducers/draw';
import activeScreenReducer from './reducers/activeScreen';
import langReducer from './reducers/lang';
import scoreReducer from './reducers/score';
import * as Actions from './reducers/actions';

const reducers = {
  players: playersReducer,
  tournament: tournamentReducer,
  activeScreen: activeScreenReducer,
  draw: drawReducer,
  lang: langReducer,
  score: scoreReducer
};

const store = create(reducers, {});
store.dispatch(Actions.makeFixedDraw(0, 9))
store.dispatch(Actions.makeFixedDraw(1, 9))
store.dispatch(Actions.makeFixedDraw(2, 9))
store.dispatch(Actions.moneyChange(0, 0, 0, '10'))
store.dispatch(Actions.moneyChange(0, 0, 1, '10'))
store.dispatch(Actions.moneyChange(0, 0, 2, '12'))
store.dispatch(Actions.activeScreenChange({screen: Actions.ACTIVE_SCREEN_DRAW}))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
