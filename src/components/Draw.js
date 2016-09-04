import React from 'react';
import {connect} from 'react-redux';
//import {playerChange} from '../reducers/actions';
import {Table} from 'react-bootstrap';
import {sprintf} from 'sprintf-js';


class Draw extends React.Component {
  render() {
    const lang = this.props.lang;
    const rounds = this.props.rounds.toJS();
    const numTables = this.props.listCnt / 3;

    let tr = []
    for(let t = 0; t < numTables;++t) {
        let row = [];
        for(let r=0; r<this.props.numRounds; ++r) {
            row.push(<td key={t+'.'+r+'.1'}><p className="text-center">{r<rounds.length ? 1+rounds[r][t][0] : ''}</p></td>)
            row.push(<td key={t+'.'+r+'.2'}><p className="text-center">{r<rounds.length ? 1+rounds[r][t][1] : ''}</p></td>)
            row.push(<td key={t+'.'+r+'.3'}><p className="text-center">{r<rounds.length ? 1+rounds[r][t][2] : ''}</p></td>)
        }
        tr.push(<tr key={'tr'+t}>{row}</tr>)
    }

    return (
        <div>
            <h1>{this.props.tourName}</h1>
            <h2>{lang.IDS_DRAW}</h2>
            <Table striped bordered condensed hover>
            <thead>
            <tr>
                {[...Array(this.props.numRounds).keys()].map(i => <th key={'th' + i} colSpan="3">{sprintf(lang.IDS_NTH_ROUND, i+1)}</th>)}
            </tr>
            </thead>
            <tbody>
            {tr}{/*<tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
            </tr>
            <tr>
                <td>3</td>
                <td colSpan="2">Larry the Bird</td>
                <td>@twitter</td>
            </tr>*/}
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
