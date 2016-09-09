import React from 'react';
import {connect} from 'react-redux';
import {Table} from 'react-bootstrap';
import {sprintf} from 'sprintf-js';
import _ from 'lodash';

class RoundTable extends React.Component {
  render() {
    const { table, round, names, order, lang } = this.props;
    return (
      <div>
        <Table bordered condensed hover>
          <tbody>
            <tr>
              <td className="col-md-1" rowSpan="4"><strong>{1+table}</strong></td>
              <td className="col-md-9"><strong>{sprintf(lang.IDS_NTH_ROUND, 1+round) }</strong></td>
              <td className="col-md-1"><strong>{lang.IDS_MONEY}</strong></td>
              <td className="col-md-1"><strong>{lang.IDS_POINTS}</strong></td>
            </tr>
            <tr>
              <td>{order.get(0) + 1}.{names.get(order.get(0)).get('name') }</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>{order.get(1) + 1}.{names.get(order.get(1)).get('name') }</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>{order.get(2) + 1}.{names.get(order.get(2)).get('name') }</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

class Round extends React.Component {
  render() {
    const {r, rounds, players, lang} = this.props
    const round = rounds.get(r);
    return (
      <div>
        <h1>{this.props.tourName}</h1>
        <h2>{sprintf(lang.IDS_NTH_ROUND, r+1) }</h2>
        {_.times(
          this.props.listCnt / 3,
          t => <RoundTable
            key={`rt-${r}-${t}`}
            round={r}
            table={t}
            names={players}
            order={round.get(t) }
            lang={lang} />
        ) }
      </div>
    );
  }
}

export default connect(
  state => ({
    lang: state.lang,
    rounds: state.draw.get('round'),
    tourName: state.tournament.get('name'),
    players: state.players.get('list'),
    listCnt: state.players.get('listCnt')
  })
)(Round);