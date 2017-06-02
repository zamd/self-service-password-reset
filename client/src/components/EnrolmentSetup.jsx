import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import SMSEnrolment from './SMSEnrolment';
import EmailEnrolment from './EmailEnrolment';
import * as enrolmentActions from '../actions/enrolment';
import { Link, Route } from 'react-router-dom';

class EnrolmentSetup extends Component {

  render() {
    const { match } = this.props;
    const smsEnrolmentComponent = () => <SMSEnrolment {...this.props} />;
    const emailEnrolmentComponent = () => <EmailEnrolment  {...this.props} />;
    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-md-4">
            <Link to={`${match.url}/setup/sms`}>
              <article className="card-docs">
                <i className="card-docs-icon icon-budicon-106 orange"></i>
                <h2 className="card-docs-title">SMS</h2>
              </article>
            </Link>
          </div>

          <div className="col-xs-12 col-md-4">
            <Link to={`${match.url}/setup/email`}>
              <article className="card-docs">
                <i className="card-docs-icon icon-budicon-106 orange"></i>
                <h2 className="card-docs-title">EMAIL</h2>
              </article>
            </Link>
          </div>
        </div>
      
        <Route path={`${match.url}/setup/sms`} component={smsEnrolmentComponent} />
        <Route path={`${match.url}/setup/email`} component={emailEnrolmentComponent} />
      </div>
    )
  }
}

export default EnrolmentSetup;