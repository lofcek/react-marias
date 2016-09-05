import React from 'react';
import {connect} from 'react-redux';
//import {playerChange} from '../reducers/actions';
import {Table} from 'react-bootstrap';
import {sprintf} from 'sprintf-js';
import _ from loadash;

class Draw extends React.Component {
  render() {
    const lang = this.props.lang;
    const rounds = this.props.rounds.toJS();
    const numTables = this.props.listCnt / 3;

    return (
      <div>
        <h1>{this.props.tourName}</h1>
        <h2>{lang.IDS_DRAW}</h2>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              {[...Array(this.props.numRounds).keys()].map(i => <th key={'th' + i} colSpan="3" className="text-center">{sprintf(lang.IDS_NTH_ROUND, i + 1) }</th>) }
            </tr>
          </thead>
          <tbody>
            _.times(
            this.props.numRounds,
            t =>
            <tr key={'tr' + t}>{row}
              {
                _.flatten(
                  _.times(this.props.numRounds,
                    r => [
                      <td key={t + '.' + r + '.1'} className="text-center">{r < rounds.length ? 1 + rounds[r][t][0] : ''}</td>,
                      <td key={t + '.' + r + '.2'} className="text-center">{r < rounds.length ? 1 + rounds[r][t][1] : ''}</td>,
                      <td key={t + '.' + r + '.3'} className="text-center">{r < rounds.length ? 1 + rounds[r][t][2] : ''}</td>
                    ]
                  ))
              }
            </tr>
            )

          </tbody>
        </Table>
      </div>
    );
  }
}

export default connect(
  state => ({
    lang: state.lang,
    rounds: state.draw.get('round'),
    tourName: state.tournament.get('name'),
    numRounds: state.tournament.get('numRounds'),
    listCnt: state.players.get('listCnt'),
  })
)(Draw);
