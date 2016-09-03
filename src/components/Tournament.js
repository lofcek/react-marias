import React from 'react';
import {connect} from 'react-redux';
import {Grid,Row,Col} from 'react-bootstrap';
import * as Actions from '../reducers/actions'

class Tournament extends React.Component {
  render() {
    const lang = this.props.lang;
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