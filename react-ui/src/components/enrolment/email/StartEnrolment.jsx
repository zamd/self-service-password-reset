import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@auth0/styleguide-react-components';

const StartEnrolment = ({ enrollEmail, accessToken }) => {
  let email;
  return (
    <div className="row" style={{ marginTop: 25 }} >
      <div className="col-xs-3">
        <div className="form-group">
          <label className="control-label" htmlFor="email">Enter email address to enrol</label>
          <input type="email" ref={(input)=> {email=input}} className="form-control" name="email" placeholder="Email" autoFocus  />
        </div>
      </div>
      <div className="col-xs-12">
          <Button onClick={()=>enrollEmail(email.value, accessToken)}>Enrol</Button>
      </div>
    </div>
  );
}

StartEnrolment.propTypes = {
  enrollEmail: PropTypes.func.isRequired,
  accessToken: PropTypes.string.isRequired
};

export default StartEnrolment;