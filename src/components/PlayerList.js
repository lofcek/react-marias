import React from 'react';
import {connect} from 'react-redux';
import {playerChange, makeFixedDraw} from '../reducers/actions';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {sprintf} from 'sprintf-js';

class PlayerList extends React.Component {
  handleMakeFixedDraws(e) {
    for (let i = 0; i < this.props.numFixed; ++i) {
      this.props.makeFixedDraw(i, this.props.playersCnt);
    }
  }
  render() {
    const lang = this.props.lang;
    let players = this.props.playersList.map((p, num) => {
      return (
        <div key={num} className="row" hidden={num > this.props.playersCnt}>
          <div className="col-lg-1">{num + 1}.</div>
          <div className="col-lg-6">
            <input type="text" value={p.get('name') } onChange={(e) => this.props.playerChange(num, { name: e.target.value }) }/>
          </div>
          <div className="col-lg-5">
            <input type="text" value={p.get('club') } onChange={(e) => this.props.playerChange(num, { club: e.target.value }) }/>
          </div>
        </div>
      )
    })
    let buttons = (
      <ButtonToolbar>
        <Button
          bsStyle="primary"
          disabled={this.props.playersCnt % 3 !== 0}
          onClick={(e) => this.handleMakeFixedDraws(e) }
          >
          {sprintf(lang.IDS_DRAW_FIRST_ROUNDS[lang.pluralForm(this.props.numFixed)], this.props.numFixed) }
        </Button>
      </ButtonToolbar>);
    return (
      <div>
        <h1>{this.props.tourName}</h1>
        <h2>{lang.IDS_ROASTER}</h2>
        <div className="row">
          <div className="col-lg-1">#</div>
          <div className="col-lg-6">{lang.IDS_PLAYER_NAME}</div>
          <div className="col-lg-5">{lang.IDS_PLAYER_CLUB}</div>
        </div>
        {players}
        {buttons}
      </div>
    );
  }
}

export default connect(
  state => ({
    playersList: state.players.get('playersList'),
    playersCnt: state.players.get('playersCnt'),
    lang: state.lang,
    tourName: state.tournament.get('name'),
    numFixed: state.tournament.get('numFixed'),
  }), {
    playerChange,
    makeFixedDraw
  }
)(PlayerList);
