import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@auth0/styleguide-react-components';
import Loading from '../../Loading';

const InProgressEnrolment = ({ emailEnrolment: { inProgressMessage } }) => {
  return (
    <div>
      <div className="row" style={{ "margin-top": 25 }}>
        <div className="col-xs-12">
          {inProgressMessage ? inProgressMessage : 'Configuring email enrolment...'}
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
  emailEnrolment: PropTypes.object.isRequired
};

export default InProgressEnrolment;