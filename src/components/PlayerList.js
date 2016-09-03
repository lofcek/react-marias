import React from 'react';
import {connect} from 'react-redux';
import {playerChange} from '../reducers/actions';
import {Button, ButtonToolbar} from 'react-bootstrap';

class PlayerList extends React.Component {
  render() {
    const lang = this.props.lang;
    let players = this.props.list.map((p,num) => {
        return (       
            <div key={num} className="row" hidden={num > this.props.listCnt}>
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
    let buttons =
        <ButtonToolbar>
            <Button bsStyle="primary">draw</Button>
        </ButtonToolbar>
    return (
      <div>
        <h1>{this.props.tourName}</h1>
        <h2>{lang.IDS_LIST_OF_PLAYERS}</h2>
        <div className="row">
            <div className="col-lg-1">#</div>
            <div className="col-lg-6">{lang.IDS_PLAYER_NAME}</div>
            <div className="col-lg-5">{lang.IDS_PLAYER_CLUB}</div>
        </div>
        {players}
        {buttons}
        <pre>
            {JSON.stringify(this.props.list.toJS(), null, 2)}
        </pre>
      </div>
    );
  }
}

export default connect(
  state => ({
    list: state.players.get('list'),
    listCnt: state.players.get('listCnt'),
    lang: state.lang,
    tourName: state.tournament.get('name')
  }), {
      playerChange
  }
)(PlayerList);
