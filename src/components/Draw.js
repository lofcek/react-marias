import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../reducers/actions';
import {Table} from 'react-bootstrap';
import {sprintf} from 'sprintf-js';
import _ from 'lodash';

const [STATUS_OK, STATUS_WARNING, STATUS_DANGER] = ['', 'warning', 'danger']

class EditableTd extends React.Component {
  render() {
    const {t, r, p, text, active, focusDraw, editDraw} = this.props;
    const verifyClass = this.props.verify ? this.props.verify(_.toNumber(text)) : STATUS_OK;

    if (!active) {
      return (
        <td key={`t-${r}-${p}`} className={`${verifyClass} text-center`} onClick={(e) => { focusDraw(r, t, p, text) } }>{text}</td>
      )
    } else {
      return <td key={`ti-${r}-${p}`} className={`${verifyClass} text-center`}><input type="text" value={text} onChange={(e) => editDraw(e.target.value) } onBlur={(e) => focusDraw(null, null, null, null) } /></td>
    }
  }
}

class Draw extends React.Component {
  render() {
    const rounds = this.props.rounds.toJS();
    const numTables = rounds.length ? this.props.listCnt / 3 : 0;
    const {lang, editDraw, focusDraw, edited} = this.props;

    let isActive = (round, table, player) => {
      return (
        round === this.props.edited.get('round') &&
        table === this.props.edited.get('table') &&
        player === this.props.edited.get('player'));
    }
    let verify = text => {
      if (!_.isFinite(text)) return STATUS_DANGER;
      let n = _.toNumber(text)-1;
      return n >= 0 && n < this.props.listCnt && _.isInteger(n) ? STATUS_OK : STATUS_DANGER;
    }
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
            {
              _.times(
                numTables,
                t =>
                  <tr key={'tr' + t}>
                    {
                      _.zip(
                        _.times(
                          this.props.numRounds,
                          r =>
                            _.times(3, p => <EditableTd t={t} r={r} p={p} text={isActive(r, t, p) ? edited.get('text') : r < rounds.length ? 1 + rounds[r][t][p] : ''} active={isActive(r, t, p) } focusDraw={focusDraw}  editDraw={editDraw} verify={r < rounds.length ? verify : null}/>
                            )))
                    }
                  </tr>
              )
            }
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
    edited: state.draw.get('edited'),
    tourName: state.tournament.get('name'),
    numRounds: state.tournament.get('numRounds'),
    listCnt: state.players.get('listCnt')
  }), {
    focusDraw: Actions.focusDraw,
    editDraw: Actions.editDraw
  }
)(Draw);
