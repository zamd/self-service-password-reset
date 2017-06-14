import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@auth0/styleguide-react-components';

const EmailEnrolment = ({ enrollEmail, verifyEmail,  enrolment, accessToken }) => { 
  let username = enrolment.get('username');
  const enrolmentStarted = !!username;
  let email, otp;
  
  return (
    <div className="row" style={{ "margin-top": 25 }} >
      <div className="col-xs-3">
        { enrolmentStarted ? 
            <div className="form-group">
              <label className="control-label" htmlFor="otp">Enter OTP</label>
              <input type="text" ref={(input)=> {otp=input}} className="form-control" name="otp" placeholder="OTP" autoFocus  />
            </div>
        : 
            <div className="form-group">
              <label className="control-label" htmlFor="email">Enter email address to enrol</label>
              <input  disabled={enrolment.get('inProgress')} type="email" ref={(input)=> {email=input}} className="form-control" name="email" placeholder="Email" autoFocus  />
            </div>
        }
      </div>
      <div className="col-xs-12">
        { enrolmentStarted ?
          <Button onClick={()=>verifyEmail(username, otp.value, accessToken)}>Confirm</Button>
        :
          <Button disabled={enrolment.get('inProgress')} onClick={()=>enrollEmail(email.value, accessToken)}>Enroll Email</Button>
        }
      </div>
    </div>
  );
};

EmailEnrolment.propTypes = {
  enrollEmail: PropTypes.func.isRequired,
  enrolment: PropTypes.object.isRequired
};

export default EmailEnrolment;