import React from 'react';
import {connect} from 'react-redux';
import PlayerList from './PlayerList';
import Tournament from './Tournament';
import Draw from './Draw';
import Round from './Round';
import {Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import * as Actions from '../reducers/actions';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';

class App extends React.Component {
  render() {
    let screenBody = ' ';
    switch (this.props.activeScreen.get('screen')) {
      case Actions.ACTIVE_SCREEN_TOUR:
        screenBody = <Tournament/>;
        break;
      case Actions.ACTIVE_SCREEN_PLAYERS:
        screenBody = <PlayerList/>;
        break;
      case Actions.ACTIVE_SCREEN_DRAW:
        screenBody = <Draw/>;
        break;
      case Actions.ACTIVE_SCREEN_ROUNDS:
        console.log("round ---- ", this.props.activeScreen.get('round'))
        screenBody = <Round r={this.props.activeScreen.get('round')}/>;
        break;
      // no default
    }
    
    const lang = this.props.lang;
    const roundDisabled = this.props.round.map(r => r.size === 0);
    return (
      <div>
        <Nav bsStyle="tabs"
          activeKey={this.props.screen}
          onSelect={(eventKey, e) => { e.preventDefault(); this.props.activeScreenChange(eventKey); } }>
          <NavItem eventKey={{screen: Actions.ACTIVE_SCREEN_TOUR}}>{lang.IDS_TOURNAMENT}</NavItem>
          <NavDropdown id="players" title={lang.IDS_PLAYERS}>
            <MenuItem eventKey={{screen: Actions.ACTIVE_SCREEN_PLAYERS}}>{lang.IDS_ROASTER}</MenuItem>
            <MenuItem eventKey={{screen: Actions.ACTIVE_SCREEN_DRAW}}>{lang.IDS_DRAW}</MenuItem>
          </NavDropdown>
          <NavDropdown id="rounds" title={lang.IDS_ROUNDS}>
            {_.times(
              this.props.numRounds,
              r => <MenuItem key={`r-${r}`} eventKey={{screen:Actions.ACTIVE_SCREEN_ROUNDS, round: r}} disabled={(r >= roundDisabled.size) || roundDisabled[r]}>{sprintf(lang.IDS_NTH_ROUND, 1+r)}</MenuItem>
            )}
          </NavDropdown>
        </Nav>
        {screenBody}
      </div>
    );
  }
}

export default connect(
  state => ({
    numRounds: state.tournament.get('numRounds'),
    activeScreen: state.activeScreen,
    lang: state.lang,
    round: state.draw.get('round'),
  }), {
    activeScreenChange: Actions.activeScreenChange
  }
)(App);
