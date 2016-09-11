import React from 'react';
import {connect} from 'react-redux';
import {Table} from 'react-bootstrap';
import {sprintf} from 'sprintf-js';
import {moneyChange} from '../reducers/actions';
//import Immutable from 'immutable';
import _ from 'lodash';


function points(m1, m2, m3) {
  const arr = [m1, m2, m3]
  return _.map(arr, x=> _.sum(_.map(arr, n => (x > n) + (x >= n))))
}

class RoundTable extends React.Component {
  render() {
    const { table, lang, players, round, order, money_str, money_float } = this.props;
    let pts = ['', '', '']
    if ('number' === typeof money_float.get(0) && 'number' === typeof money_float.get(1) && 'number' === typeof money_float.get(2))
      pts = points(money_float.get(0), money_float.get(1), money_float.get(2))

    return (
      <div>
        <Table bordered condensed hover>
          <tbody>
            <tr>
              <td className="col-md-1" rowSpan="4"><strong>{1 + table}</strong></td>
              <td className="col-md-9"><strong>{sprintf(lang.IDS_NTH_ROUND, 1 + round) }</strong></td>
              <td className="col-md-1"><strong>{lang.IDS_MONEY}</strong></td>
              <td className="col-md-1"><strong>{lang.IDS_POINTS}</strong></td>
            </tr>
            {
              _.times(3, i =>
                <tr key={`tr-${round}-${table}-${i}`}>
                  <td>{order.get(i) + 1}.{players.get(order.get(i)).get('name') }</td>
                  <td><input type="text" value={money_str.get(i)} onChange={e => this.props.moneyChange(round, table, i, e.target.value) }/></td>
                  <td>{pts[i]}</td>
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
  (state, ownProps) => ({
    lang: state.lang,
    players: state.players.get('list'),
    order: state.draw.getIn(['round', ownProps.round, ownProps.table]),
    money_str: state.money.getIn(['money_str', ownProps.round, ownProps.table],  null),
    money_float: state.money.getIn(['money_float', ownProps.round, ownProps.table],  null)
  }), {
    moneyChange
  }
)(RoundTable);