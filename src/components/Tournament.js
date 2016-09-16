import React from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import * as Actions from '../reducers/actions'
import _ from 'lodash';

class Tournament extends React.Component {
  render() {
    const lang = this.props.lang;
    const numRounds = this.props.tournament.get('numRounds') || 5;
    const numFixed = this.props.tournament.get('numFixed') || 3;
    return (
      <Grid fluid={true}>
        <Row>
          <Col xs={12} md={12}>
            <h1>{this.props.tournament.get('name') }</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={6}>
            <p>{lang.IDS_TOURNAMENT_NAME}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={6}>
            <input placeholder={lang.IDS_PLACEHOLDER_TOUR_NAME} value={this.props.tournament.get('name') } onChange={(e) => this.props.tournamentChange({ name: e.target.value }) }/>
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
            <select value={numFixed} onChange={(e) => this.props.tournamentChange({ numFixed: Number(e.target.value) }) }>
              {_.times(numRounds, i => <option key={`f${i + 1}`} value={i + 1}>{i + 1}</option>) }
            </select>
          </Col>
          <Col xs={6} md={6}>
            <select value={numRounds} onChange={(e) => this.props.tournamentChange({ numRounds: Number(e.target.value) }) }>
              {_.times(10, i => <option key={`n${i + 1}`} value={i + 1}>{i + 1}</option>) }
            </select>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={6}>
            {lang.IDS_RULE_SCORE0}
            <div className="radio">
              <label><input type="radio" className="optradio" name="score0" checked={!this.props.rulePoints0} onChange={() => this.props.setRule({points0: false})}/>{lang.IDS_RULE_NORMAL}</label>
            </div>
            <div className="radio">
              <label><input type="radio" className="optradio" name="score0" checked={this.props.rulePoints0} onChange={() => this.props.setRule({points0: true})}/>{lang.IDS_RULE_NOPOINT}</label>
            </div>
          </Col>
          <Col xs={6} md={6}>
            {lang.IDS_RULE_ORDER}
            <div className="radio">
              <label><input type="radio" className="optradio" name="preferMoney" checked={!this.props.rulePreferMoney} onChange={() => this.props.setRule({preferMoney: false})}/>{lang.IDS_RULE_POINTS_FIRST}</label>
            </div>
            <div className="radio">
              <label><input type="radio" className="optradio" name="preferMoney" checked={this.props.rulePreferMoney} onChange={() => this.props.setRule({preferMoney: true})}/>{lang.IDS_RULE_MONEY_FIRST}</label>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default connect(
  state => ({
    tournament: state.tournament,
    lang: state.lang,
    rulePoints0: state.score.get('rule').get('points0'),
    rulePreferMoney: state.score.get('rule').get('preferMoney')
  }), {
    tournamentChange: Actions.tournamentChange,
    setRule: Actions.setRule
  }
)(Tournament);