import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@auth0/styleguide-react-components';
import Loading from '../../Loading';

const InProgressEnrolment = ({ smsEnrolment: { inProgressMessage } }) => {
  return (
    <div>
      <div className="row" style={{ marginTop: 25 }} >
        <div className="col-xs-3">
          {inProgressMessage ? inProgressMessage : 'Configuring SMS enrolment... '}
        </div>
      </div>
      <div className="row">
        <div className="col-xs-3">
          <Loading show={true} />
        </div>
      </div>
    </div>
  );
}

InProgressEnrolment.propTypes = {
  smsEnrolment: PropTypes.object.isRequired
};

export default InProgressEnrolment;