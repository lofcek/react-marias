import React from 'react';
import {connect} from 'react-redux';
import {playerChange} from '../reducers/actions'; 

class PlayerList extends React.Component {
  render() {
    let players = this.props.players.map((p,num) => {
        return (       
            <div key={num} className="row">
                <div className="col-lg-1">{num+1}.</div>
                <div className="col-lg-6">
                    <input type="text" value={p.get('name')} onChange={(e)=> this.props.playerChange(num, {name: e.target.value})}/>
                </div>
                <div className="col-lg-5">
                    <input type="text" value={p.get('club')} onChange={(e)=> this.props.playerChange(num, {club: e.target.value})}/>
                </div>
                
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
        <pre>
            {JSON.stringify(this.props.players.toJS(), null, 2)}
        </pre>
      </div>
    );
  }
}

export default connect(
  state => ({
    players: state.players
  }), {
      playerChange
  }
)(PlayerList);
