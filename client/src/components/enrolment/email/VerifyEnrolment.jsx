import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@auth0/styleguide-react-components';

const VerifyEnrolment = ({ emailEnrolment, verifyEmail, accessToken }) => {
  const {email} = emailEnrolment;
  let input, otp;

  return (
    <div className="row" style={{ marginTop: 25 }} >
      <div className="col-xs-3">
          <div className="form-group">
            <label className="control-label" htmlFor="otp">Enter OTP</label>
            <input type="text" ref={(el)=> {input=el}} className="form-control" name="otp" placeholder="OTP" autoFocus  />
          </div>
      </div>
      <div className="col-xs-12">
          <Button onClick={()=>verifyEmail(email, input.value, accessToken)}>Confirm</Button>
      </div>
    </div>
  );
}

VerifyEnrolment.propTypes = {
  emailEnrolment: PropTypes.object.isRequired,
  verifyEmail: PropTypes.func.isRequired,
  accessToken: PropTypes.string.isRequired
};

export default VerifyEnrolment;