import React from 'react';
import {connect} from 'react-redux';
import PlayerList from './PlayerList';
import Tournament from './Tournament';
import Draw from './Draw';
import {Nav,NavItem,NavDropdown,MenuItem} from 'react-bootstrap';
import * as Actions from '../reducers/actions';

class App extends React.Component {
  render() {
    let screenBody = ' ';
    switch(this.props.activeScreen) {
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
    return (
      <div>
        <Nav bsStyle="tabs" 
          activeKey={this.props.activeScreen}
          onSelect={(eventKey, e)=> {e.preventDefault(); this.props.activeScreenChange(eventKey);}}>
          <NavItem eventKey={Actions.ACTIVE_SCREEN_TOUR}>{lang.IDS_TOURNAMENT}</NavItem>
          <NavDropdown id="players" title={lang.IDS_PLAYERS}>
            <MenuItem eventKey={Actions.ACTIVE_SCREEN_PLAYERS}>{lang.IDS_ROASTER}</MenuItem>
            <MenuItem eventKey={Actions.ACTIVE_SCREEN_DRAW}>{lang.IDS_DRAW}</MenuItem>
          </NavDropdown>
          <NavItem eventKey={Actions.ACTIVE_SCREEN_ROUNDS} disabled>Rounds</NavItem>
        </Nav>
        {screenBody}
      </div>
    );
  }
}

export default connect(
	state=>({
    tournament: state.tournament,
    activeScreen: state.activeScreen.get('screen'),
    lang: state.lang
  }), {
      activeScreenChange: Actions.activeScreenChange
  }
)(App);
