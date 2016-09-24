import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../reducers/actions';
import {Table} from 'react-bootstrap';
import {sprintf} from 'sprintf-js';
import _ from 'lodash';

const [STATUS_OK, STATUS_WARNING, STATUS_DANGER] = ['', 'warning', 'danger']

class EditableTd extends React.Component {
  render() {
    const {r, t, p, isActive, playerNum, isEditable, isAlreadyUsed, focusDraw, editDraw} = this.props;   
    //const verifyClass = this.props.verify ? this.props.verify(_.toNumber(text)) : STATUS_OK;
    let verifyClass = isEditable && playerNum===null ? STATUS_DANGER: (isAlreadyUsed ? STATUS_WARNING : STATUS_OK);

    if (!isActive || !isEditable) {
      let text = playerNum===null ? '-' :playerNum+1;
      return (
        <td
          key={`t-${r}-${p}`}
          className={`${verifyClass} text-center`}
          onClick={isEditable ? (e) => { focusDraw(r, t, p, text) } : undefined}
        >{text}</td>
      )
    } else {
      let {activeText} = this.props;
      if (activeText === null) activeText = '';
      return (
        <td key={`ti-${r}-${p}`} className={`${verifyClass} text-center`}>
          <input
            type="text"
            value={activeText}
            onChange={(e) => editDraw(e.target.value) }
            onBlur={(e) => {
              let n = _.toInteger(e.target.value);
              editDraw(_.isFinite(n) ? n : null);
              focusDraw(null, null, null, null); }} />
        </td>);
    }
  }
}
EditableTd = connect(
  (state, ownProps) => ({
    playerNum: state.draw.getIn(['round', ownProps.r, ownProps.t, ownProps.p], null),
    isEditable: ownProps.r < state.draw.get('round').size,
    activeText: ownProps.isActive ? state.draw.get('edited').get('text') : undefined
  }), {
    focusDraw: Actions.focusDraw,
    editDraw: Actions.editDraw
  }
)(EditableTd);

class Draw extends React.Component {
  render() {
    const rounds = this.props.rounds.toJS();
    const numTables = rounds.length ? this.props.listCnt / 3 : 0;
    const {lang, edited} = this.props;

    // map how often appeared such number (show warning for used more than once in a round)
    let countUsed = []
      for(let r=0; r < rounds.length; r++)
        countUsed.push(_.countBy(_.flatten(rounds[r])))
    let isAlreadyUsed = function(r,t,p) {
        // true if round and player is valid, and number of player appeared more than once
        return r < rounds.length && rounds[r][t][p]!==null && countUsed[r][rounds[r][t][p]]>1;
    }
    let isActive = function(round, table, player) {
      return (
        round === edited.get('round') &&
        table === edited.get('table') &&
        player === edited.get('player'));
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
                            _.times(3, p => <EditableTd t={t} r={r} p={p} isActive={isActive(r, t, p)} isAlreadyUsed={isAlreadyUsed(r,t,p)}/>
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
  })
)(Draw);
