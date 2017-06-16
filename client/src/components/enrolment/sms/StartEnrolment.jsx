import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@auth0/styleguide-react-components';

const StartEnrolment = ({ enrollSMS, accessToken }) => {
  let phoneNumber;
  return (
    <div className="row" style={{ "margin-top": 25 }} >
      <div className="col-xs-3">
        <div className="form-group">
            <label className="control-label" htmlFor="phone">Enter phone number to enrol</label>
            <input type="text" ref={(input)=> {phoneNumber=input}} className="form-control" name="phone" placeholder="Phone number" autoFocus  />
        </div>
      </div>
      <div className="col-xs-12">
          <Button onClick={()=>enrollSMS(phoneNumber.value, accessToken)}>Enrol</Button>
      </div>
    </div>
  );
}

StartEnrolment.propTypes = {
  enrollSMS: PropTypes.func.isRequired,
  accessToken: PropTypes.string.isRequired
};

export default StartEnrolment;