import React from 'react';
import {connect} from 'react-redux';
//import {Table} from 'react-bootstrap';
//import {sprintf} from 'sprintf-js';
import _ from 'lodash';

const [STATUS_OK, STATUS_WARN, STATUS_ERR] = _.range(3);
console.log(":::", STATUS_OK, STATUS_WARN, STATUS_ERR)

class Standings extends React.Component {
  render() {
    const { listCnt, lang, players, round, order, score, points } = this.props;

    // lists how much points and money player gets in each round
    let pts = _.times(listCnt, () => _.times(round.size, () => []))
    let mny = _.times(listCnt, () => _.times(round.size, () => []))

    console.log("mny", listCnt, mny[0]);

    round.forEach(
      (table, r) => table.forEach(
        (players, t) => players.forEach(
          p => {
            mny[p][r].push(score.getIn(['money_float', r, t, p], null))
            pts[p][r].push(score.getIn(['points', r, t, p], null))
          }
        )
      )
    )

    let users = _.times(listCnt,
      p => {
        let user = _.extend({ number: p }, players[p])
        user.rounds = _.times(round.size, r => ({
          money: _.sum(mny[p][r]),
          points: _.sum(pts[p][r]),
          money_status: mny[p][r].length !== 1 ? STATUS_ERR : (mny[p][r][0] === null ? STATUS_WARN : STATUS_OK),
          point_status: pts[p][r].length !== 1 ? STATUS_ERR : (pts[p][r][0] === null ? STATUS_WARN : STATUS_OK)
        })
        )
        user.total_money = _.sum(user.money)
        user.total_points = _.sum(user.points)
        return user
      }
    )

    return (
      <div>
        <pre>
          {JSON.stringify(users, null, 2) }
        </pre>
      </div>
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