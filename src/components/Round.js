import React from 'react';
import {connect} from 'react-redux';
//import {Table} from 'react-bootstrap';
import {sprintf} from 'sprintf-js';
import _ from 'lodash';
import RoundTable from './RoundTable.js'


class Round extends React.Component {
  render() {
    const {r, lang} = this.props
    return (
      <div>
        <h1>{this.props.tourName}</h1>
        <h2>{sprintf(lang.IDS_NTH_ROUND, r+1) }</h2>
        {_.times(
          this.props.playersCnt / 3,
          t => <RoundTable
            key={`rt-${r}-${t}`}
            round={r}
            table={t}
             />
        ) }
      </div>
    );
  }
}

export default connect(
  state => ({
    lang: state.lang,
    tourName: state.tournament.get('name'),
    players: state.players.get('playersList'),
    playersCnt: state.players.get('playersCnt')
  })
)(Round);