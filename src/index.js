import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import { Provider } from 'react-redux';
import create from './store';
import playersReducer from './reducers/player'
import tournamentReducer from './reducers/tournament'
import activeScreenReducer from './reducers/activeScreen'
import langReducer from './reducers/lang'

const reducers = {
  players: playersReducer,
  tournament: tournamentReducer,
  activeScreen: activeScreenReducer,
  lang: langReducer
};

const store = create(reducers, {});

ReactDOM.render(
   <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);
