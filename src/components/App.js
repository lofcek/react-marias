import React from 'react';
import {connect} from 'react-redux';
import PlayerList from './PlayerList';
import Tournament from './Tournament';
import Draw from './Draw';
import {Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import * as Actions from '../reducers/actions';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';

class App extends React.Component {
  render() {
    let screenBody = ' ';
    switch (this.props.activeScreen) {
      case Actions.ACTIVE_SCREEN_TOUR:
        screenBody = <Tournament/>;
        break;
      case Actions.ACTIVE_SCREEN_PLAYERS:
        screenBody = <PlayerList/>;
        break;
      case Actions.ACTIVE_SCREEN_DRAW:
        screenBody = <Draw/>;
        break;
      // no default
    }
    const lang = this.props.lang;
    const roundDisabled = this.props.round.map(r => r.size === 0);
    return (
      <div>
        <Nav bsStyle="tabs"
          activeKey={this.props.activeScreen}
          onSelect={(eventKey, e) => { e.preventDefault(); this.props.activeScreenChange(eventKey); } }>
          <NavItem eventKey={Actions.ACTIVE_SCREEN_TOUR}>{lang.IDS_TOURNAMENT}</NavItem>
          <NavDropdown id="players" title={lang.IDS_PLAYERS}>
            <MenuItem eventKey={Actions.ACTIVE_SCREEN_PLAYERS}>{lang.IDS_ROASTER}</MenuItem>
            <MenuItem eventKey={Actions.ACTIVE_SCREEN_DRAW}>{lang.IDS_DRAW}</MenuItem>
          </NavDropdown>
          <NavDropdown id="rounds" title={lang.IDS_ROUNDS}>
            {_.times(
              this.props.numRounds,
              r => <MenuItem key={`r-${r}`} eventKey={{screen: Actions.ACTIVE_SCREEN_ROUNDS, subscreen:r}} disabled={(r >= roundDisabled.size) || roundDisabled[r]}>{sprintf(lang.IDS_NTH_ROUND, 1+r)}</MenuItem>
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
    activeScreen: state.activeScreen.get('screen'),
    lang: state.lang,
    round: state.draw.get('round'),
  }), {
    activeScreenChange: Actions.activeScreenChange
  }
)(App);
