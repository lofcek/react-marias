import React from 'react';
import {connect} from 'react-redux';
import PlayerList from './PlayerList';
import Tournament from './Tournament';
import { Nav, NavItem} from 'react-bootstrap';
import * as Actions from '../reducers/actions'

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
      // no default
    }
    const lang = this.props.lang;
    return (
      <div>
        <Nav bsStyle="tabs" 
          activeKey={this.props.activeScreen}
          onSelect={(eventKey, e)=> {e.preventDefault(); this.props.activeScreenChange(eventKey);}}>
          <NavItem eventKey={Actions.ACTIVE_SCREEN_TOUR}>{lang.IDS_TOURNAMENT}</NavItem>
          <NavItem eventKey={Actions.ACTIVE_SCREEN_PLAYERS}>{lang.IDS_LIST_OF_PLAYERS}</NavItem>
          <NavItem eventKey={Actions.ACTIVE_SCREEN_ROUNDS} disabled>Rounds</NavItem>
        </Nav>
        {screenBody}
      </div>
    );
        /*<div className="container-fluid">
				<h1>{this.props.tournament.get('name')}</h1>
        <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleSelect}>
          <NavItem eventKey="Tournament" title="Item">Tournament</NavItem>
          <NavItem eventKey="PlayerList" title="Item">PlayerList</NavItem>
          <NavItem eventKey="Draw" title="Item">Draw</NavItem>
				  <PlayerList/>
        </Nav>
      </div>*/
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
