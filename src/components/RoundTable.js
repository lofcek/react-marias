import React from 'react';
import {connect} from 'react-redux';
import {Table} from 'react-bootstrap';
import {sprintf} from 'sprintf-js';
import {moneyChange} from '../reducers/actions';
//import Immutable from 'immutable';
import _ from 'lodash';


class RoundTable extends React.Component {
  render() {
    const { table, lang, players, round } = this.props;
    const order = this.props.rounds.getIn([round, table]);
    const money = _.times(3, i => this.props.money_str.getIn([round, table, i], ""))
    console.log(JSON.stringify(money));

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
                  <td><input type="text" value={money[i]} onChange={e => this.props.moneyChange(round, table, i, e.target.value) }/></td>
                  <td></td>
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
    players: state.players.get('list'),
    listCnt: state.players.get('listCnt'),
    rounds: state.draw.get('round'),
    money_str: state.money.get('money_str'),
  }), {
    moneyChange
  }
)(RoundTable);