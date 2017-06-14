import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@auth0/styleguide-react-components';

const SMSEnrolment = ({ enrollSMS, verifySMS, enrolment, accessToken }) => {
  let username = enrolment.get('username');
  const enrolmentStarted = !!username;
  let phone, otp;
  
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
              <label className="control-label" htmlFor="phone">Enter phone number to enrol</label>
              <input  disabled={enrolment.get('inProgress')} type="text" ref={(input)=> {phone=input}} className="form-control" name="phone" placeholder="Phone number" autoFocus  />
            </div>
        }
      </div>
      <div className="col-xs-12">
        { enrolmentStarted ?
          <Button disabled={enrolment.get('inProgress')} onClick={()=>verifySMS(username, otp.value, accessToken)}>Confirm</Button>
        :
          <Button disabled={enrolment.get('inProgress')} onClick={()=>enrollSMS(phone.value, accessToken)}>Enroll SMS</Button>
        }
      </div>
    </div>
  );
}

SMSEnrolment.propTypes = {
  enrollSMS: PropTypes.func.isRequired,
  verifySMS: PropTypes.func.isRequired,
  enrolment: PropTypes.object.isRequired,
  accessToken: PropTypes.object.isRequired
};

export default SMSEnrolment;