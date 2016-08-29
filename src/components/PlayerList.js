import React from 'react';
import {connect} from 'react-redux';

class PlayerList extends React.Component {
  render() {
    let players = this.props.players.map((p,num) => {
        return (       
            <div key={num} className="row">
                <div className="col-lg-1">{num+1}.</div>
                <div className="col-lg-6">{p.get('name')}</div>
                <div className="col-lg-5">{p.get('club')}</div>
            </div>
        )
    })
    
    return (
      <div>
        <h2>List of players</h2>
        <div className="row">
            <div className="col-lg-1">#</div>
            <div className="col-lg-6">Meno</div>
            <div className="col-lg-5">Klub</div>
        </div>
        {players}
      </div>
    );
  }
}

export default connect(
  state => ({
    players: state.players
  })
)(PlayerList);
