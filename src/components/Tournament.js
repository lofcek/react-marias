import React from 'react';
import {connect} from 'react-redux';
import {Grid,Row,Col} from 'react-bootstrap';
import * as Actions from '../reducers/actions'

class Tournament extends React.Component {
  render() {
    const lang = this.props.lang;
    const numRounds = this.props.tournament.get('numRounds') || 5;
    const numFixed  = this.props.tournament.get('numFixed') || 3;
    return (
        <Grid fluid={true}>
            <Row>
                <Col xs={12} md={12}>
                    <h1>{this.props.tournament.get('name')}</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={6} md={6}>
                    <p>{lang.IDS_TOURNAMENT_NAME}</p>
                </Col>
            </Row>
            <Row>
                <Col xs={6} md={6}>
                    <input placeholder={lang.IDS_PLACEHOLDER_TOUR_NAME} value={this.props.tournament.get('name')} onChange={(e)=>this.props.tournamentChange({name: e.target.value})}/>
                </Col>
            </Row>
            <Row>
                <Col xs={6} md={6}>
                    <p>{lang.IDS_ROUNDS_WITH_FIXED}</p>
                </Col>
                <Col xs={6} md={6}>
                    <p>{lang.IDS_ROUNDS_CNT}</p>
                </Col>
            </Row>
            <Row>
                <Col xs={6} md={6}>
                    <select value={numFixed} onChange={(e)=>this.props.tournamentChange({numFixed: Number(e.target.value)})}>
                       {[...(function*(){for(let i=1; i<=numRounds; i++)yield <option key={'f' + i} value={i}>{i}</option>})()]}
                    </select>
                </Col>
                <Col xs={6} md={6}>
                    <select value={numRounds} onChange={(e)=>this.props.tournamentChange({numRounds: Number(e.target.value)})}>
                       {[...(function*(){for(let i=1; i<=10; i++)yield <option key={'n' + i} value={i}>{i}</option>})()]}
                    </select>
                </Col>
            </Row>
        </Grid>
    );
  }
}

export default connect(
	state=>({
    tournament: state.tournament,
    lang: state.lang
  }), {
      tournamentChange: Actions.tournamentChange
  }
)(Tournament);