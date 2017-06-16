import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@auth0/styleguide-react-components';

const ManageEnrolment = ({smsEnrolment:{phoneNumber,user_id}, deleteSMSEnrolment, accessToken }) => {
  return (
    <div className="row" style={{ "margin-top": 25 }} >
      <div className="col-xs-12">
          <h3>Enrolled as: {phoneNumber}</h3>
      </div>
      <div className="col-xs-12">
          <Button bsStyle="danger" onClick={()=>deleteSMSEnrolment(user_id, accessToken)}>Delete</Button>
      </div>
    </div>
  );
}

ManageEnrolment.propTypes = {
  smsEnrolment: PropTypes.object.isRequired,
  deleteSMSEnrolment: PropTypes.func.isRequired,
  accessToken: PropTypes.string.isRequired
};

export default ManageEnrolment;