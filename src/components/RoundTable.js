import React from 'react';
import {connect} from 'react-redux';
import {Table} from 'react-bootstrap';
import {sprintf} from 'sprintf-js';
import {moneyChange} from '../reducers/actions';
import _ from 'lodash';
import Immutable from 'immutable';

class RoundTable extends React.Component {
  render() {
    const { table, lang, players, round, order, money_str, points } = this.props;

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
                  <td>{order.get(i) + 1}.{players.get(order.get(i), Immutable.Map()).get('name', '-') }</td>
                  <td><input type="text" value={money_str.get(i)} onChange={e => this.props.moneyChange(round, table, i, e.target.value) }/></td>
                  <td>{points.get(i)===null ? '' : points.get(i)}</td>
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
    players: state.players.get('playersList'),
    order: state.draw.getIn(['round', ownProps.round, ownProps.table]),
    money_str: state.score.getIn(['money_str', ownProps.round, ownProps.table],  null),
    //money_float: state.score.getIn(['money_float', ownProps.round, ownProps.table],  null),
    points: state.score.getIn(['points', ownProps.round, ownProps.table],  null)
  }), {
    moneyChange
  }
)(RoundTable);