import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@auth0/styleguide-react-components';

const ManageEnrolment = ({ emailEnrolment:{email, user_id}, deleteEmailEnrolment, accessToken }) => {
  return (
    <div className="row" style={{ "margin-top": 25 }} >
      <div className="col-xs-12">
          <h3>Enrolled as: {email}</h3>
      </div>
      <div className="col-xs-12">
          <Button bsStyle="danger" onClick={()=>deleteEmailEnrolment(user_id, accessToken)}>Delete</Button>
      </div>
    </div>
  );
}

ManageEnrolment.propTypes = {
  emailEnrolment: PropTypes.object.isRequired,
  deleteEmailEnrolment: PropTypes.func.isRequired,
  accessToken: PropTypes.string.isRequired
};

export default ManageEnrolment;