import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import SMSEnrolment from '../components/SMSEnrolment';
import EmailEnrolment from '../components/EmailEnrolment';
import * as enrolmentActions from '../actions/enrolment';
import { Link, Route } from 'react-router-dom';

class Enrolment extends Component {

  render() {
    const { match } = this.props;
    const smsEnrolmentComponent = () => <SMSEnrolment {...this.props} />;
    const emailEnrolmentComponent = () => <EmailEnrolment  {...this.props} />;
    return (
      <section className="react-component-page">
        <div className="component-information">
          <h1 className="component-title">Enrolment</h1>
          <div className="row">
            <div className="col-xs-12 col-md-4">
              <Link to="/enrolment/sms">
                <article className="card-docs">
                  <i className="card-docs-icon icon-budicon-106 orange"></i>
                  <h2 className="card-docs-title">SMS</h2>
                </article>
              </Link>
            </div>

            <div className="col-xs-12 col-md-4">
              <Link to="/enrolment/email">
                <article className="card-docs">
                  <i className="card-docs-icon icon-budicon-106 orange"></i>
                  <h2 className="card-docs-title">EMAIL</h2>
                </article>
              </Link>
            </div>
          </div>
        </div>

        <Route path={`${match.url}/sms`} component={smsEnrolmentComponent} />
        <Route path={`${match.url}/email`} component={emailEnrolmentComponent} />
      </section>
    )
  }
}

const mapStateToProps = state => ({ enrolment: state.enrolment })

export default connect(mapStateToProps, { ...enrolmentActions })(Enrolment)