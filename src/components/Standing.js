import React from 'react';
import {connect} from 'react-redux';
import {Table} from 'react-bootstrap';
import {sprintf} from 'sprintf-js';
import _ from 'lodash';

const [STATUS_OK, STATUS_WARN, STATUS_ERR] = _.range(3);
//console.log(":::", STATUS_OK, STATUS_WARN, STATUS_ERR)

class Standings extends React.Component {
  render() {
    const { listCnt, lang, players, round, order, score, points } = this.props;

    // lists how much points and money player gets in each round
    let pts = _.times(listCnt, () => _.times(round.size, () => []))
    let mny = _.times(listCnt, () => _.times(round.size, () => []))

    round.forEach(
      (table, r) => table.forEach(
        (players, t) => players.forEach(
          (p, i) => {
            //console.log(JSON.stringify([r, t, p], score.getIn(['money_float', r, t, i])))
            mny[p][r].push(score.getIn(['money_float', r, t, i], null))
            pts[p][r].push(score.getIn(['points', r, t, i], null))
          }
        )
      )
    )

    let users = _.times(listCnt,
      p => {
        let user = _.extend({ number: p }, players.get(p).toJS())
        user.rounds = _.times(round.size, r => ({
          money: _.sum(mny[p][r]),
          points: _.sum(pts[p][r]),
          money_status: mny[p][r].length !== 1 ? STATUS_ERR : (mny[p][r][0] === null ? STATUS_WARN : STATUS_OK),
          point_status: pts[p][r].length !== 1 ? STATUS_ERR : (pts[p][r][0] === null ? STATUS_WARN : STATUS_OK)
        })
        )
        user.total_money = _.sum(_.map(user.rounds, 'money'))
        user.total_points = _.sum(_.map(user.rounds, 'points'))
        return user
      }
    )
    users = _.orderBy(users, ['total_points', 'total_money', 'number'], ['desc', 'desc', 'asc'])
    let prev = []
    let total_order = 0
    users.forEach(
      (u, i) => {
        const res = [u.total_points, u.total_money]
        if (!_.isEqual(res, prev)) {
          total_order = i
        }
        u.total_order = total_order
        prev = res
      }
    )
    let center = { textAlign: "center" };

    console.log(JSON.stringify(_.countBy(users, u => u.total_points + ',' + u.total_money)))

    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th style={center}>{lang.IDS_ORDER}</th>
            <th style={center}>{lang.IDS_PLAYER_NAME}</th>
            {_.times(round.size, i => <th style={center} colSpan="2" key={`tr-${i}`}>{sprintf(lang.IDS_NTH_ROUND, 1 + i) }</th>) }
            <th style={center} colSpan="2">{lang.IDS_TOTAL}</th>
          </tr>
          <tr>
            <th style={center}/>
            <th style={center}/>
            {_.flatten(
              _.times(1 + round.size,
                i => [<th style={center} key={`pts-${i}`}>{lang.IDS_POINTS}</th>, <th style={center} key={`mny-${i}`}>{lang.IDS_MONEY}</th>])) }
          </tr>
        </thead>
        <tbody>
          {
            _.map(
              users,
              u =>
                <tr key={`u${u.number}`}>
                  <td>{1+u.total_order}.</td>
                  <td>{u.name}</td>
                  {_.flatten(
                    _.times(
                      round.size,
                      i =>
                        [
                          <td key={`r-${u.number}-${i}`}>{u.rounds[i].points}</td>,
                          <td key={`m-${u.number}-${i}`}>{u.rounds[i].money}</td>]))
                  }
                  <td>{u.total_points}</td>
                  <td>{u.total_money}</td>
                </tr>
            )
          }
        </tbody>
      </Table>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    lang: state.lang,
    players: state.players.get('list'),
    listCnt: state.players.get('listCnt'),
    round: state.draw.getIn(['round']),
    score: state.score,
    points: state.score.get('points', null)
  })
)(Standings);