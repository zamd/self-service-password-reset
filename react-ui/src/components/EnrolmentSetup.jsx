import React from 'react'
import SMSEnrolment from './SMSEnrolment';
import EmailEnrolment from './EmailEnrolment';
import { Link, Route } from 'react-router-dom';

const EnrolmentSetup = (props) => {
  const { match } = props;
  const smsEnrolmentComponent = () => <SMSEnrolment {...props} />;
  const emailEnrolmentComponent = () => <EmailEnrolment  {...props} />;
  return (
    <div>
      <hr />
      <div className="row">
        <div className="col-xs-12 col-sm-4 col-md-3">
          <Link to={`${match.url}/setup/sms`}>
            <article className="card-docs">
              <i className="card-docs-icon icon-budicon-106 orange"></i>
              <h2 className="card-docs-title">SMS</h2>
            </article>
          </Link>
        </div>

        <div className="col-xs-12 col-sm-4 col-md-3">
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

export default EnrolmentSetup;