import React from 'react';
import {connect} from 'react-redux';
import PlayerList from './PlayerList';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
				<h1>{this.props.name}</h1>
				<PlayerList/>
      </div>
    );
  }
}

export default connect(
	state=>state.tournament
)(App);
