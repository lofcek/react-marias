import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import { Provider } from 'react-redux';
import create from './store';
import Immutable from 'immutable';
//import * as reducers from './reducers';

const  init_state = {
  tournament: Immutable.fromJS({
    name: "O pohar starostu Chropova",
    date: Date.UTC(2017, 1, 1)
  }),
  players: Immutable.fromJS( [
    {name: "Jozko Mrkvicka", club: "Najvacsia diera"},
    {name: "Janko Hrasko", club: "Prievidza"}
  ])
};
const reducers = {};

const store = create(reducers, init_state);

ReactDOM.render(
   <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);
