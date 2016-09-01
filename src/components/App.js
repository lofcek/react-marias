import React from 'react';
import {connect} from 'react-redux';
import PlayerList from './PlayerList';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import * as Actions from '../reducers/actions'

class App extends React.Component {

  render() {
    return (
      <Nav bsStyle="tabs" 
        activeKey={this.props.activeScreen}
        onSelect={(eventKey, e)=> {e.preventDefault(); this.props.activeScreenChange(eventKey);}}>
        <NavItem eventKey={Actions.ACTIVE_SCREEN_TOUR}>Tournament</NavItem>
        <NavItem eventKey={Actions.ACTIVE_SCREEN_PLAYERS}>PlayerList</NavItem>
        <NavItem eventKey={Actions.ACTIVE_SCREEN_ROUNDS} disabled>Rounds</NavItem>
      </Nav>
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
    activeScreen: state.activeScreen.get('screen')
  }), {
      activeScreenChange: Actions.activeScreenChange
  }
)(App);
