import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@auth0/styleguide-react-components';

const InProgressEnrolment = ({emailEnrolment:{inProgressMessage}}) => {  
  return (
    <div className="row" style={{ "margin-top": 25 }} >
      <div className="col-xs-3">
          {inProgressMessage? inProgressMessage: 'Configuring email enrolment...' }
      </div>
    </div>
  );
}

InProgressEnrolment.propTypes = {
  emailEnrolment: PropTypes.object.isRequired
};

export default InProgressEnrolment;