import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@auth0/styleguide-react-components';

const VerifyEnrolment = ({smsEnrolment:{phoneNumber}, verifySMS, accessToken }) => {
  let phone, otp;

  return (
    <div className="row" style={{ "margin-top": 25 }} >
      <div className="col-xs-3">
          <div className="form-group">
            <label className="control-label" htmlFor="otp">Enter OTP</label>
            <input type="text" ref={(input)=> {otp=input}} className="form-control" name="otp" placeholder="OTP" autoFocus  />
          </div>
      </div>
      <div className="col-xs-12">
          <Button onClick={()=>verifySMS(phoneNumber, otp.value, accessToken)}>Confirm</Button>
      </div>
    </div>
  );
}

VerifyEnrolment.propTypes = {
  smsEnrolment: PropTypes.object.isRequired,
  verifySMS: PropTypes.func.isRequired,
  accessToken: PropTypes.string.isRequired
};

export default VerifyEnrolment;