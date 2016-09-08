import React from 'react';
import {connect} from 'react-redux';
import {Table} from 'react-bootstrap';
import Immutable from 'immutable';
//import {sprintf} from 'sprintf-js';
import _ from 'lodash';

class RoundTable extends React.Component {
  render() {
    const { table, round, names, order } = this.props;
    return (
      <div>
        <Table bordered condensed hover>
          <tbody>
            <tr>
              <td className="col-md-1" rowSpan="4">{table}</td>
              <td className="col-md-9">{round}.kolo</td>
              <td className="col-md-1">Peniaze</td>
              <td className="col-md-1">Body</td>
            </tr>
            <tr>
              <td>{order.get(0) }.{names.get(0) }</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>{order.get(1) }.{names.get(1) }</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>{order.get(2) }.{names.get(2) }</td>
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
    const {r} = this.props;
    return (
      <div>
        {_.times(this.props.listCnt/3, t => <RoundTable round={r+1} table={t+1} names={Immutable.fromJS(['name1', 'name2', 'name3']) } order={Immutable.fromJS([2, 32, 4]) } />)}
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