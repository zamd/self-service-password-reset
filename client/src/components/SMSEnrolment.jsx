import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@auth0/styleguide-react-components';
import {StartEnrolment, InProgressEnrolment, VerifyEnrolment, ManageEnrolment} from './enrolment/sms'

const SMSEnrolment = (props) => {
  const {smsEnrolment} = props;
  const {phoneNumber, status, inProgress} = smsEnrolment;
  const enrolmentStarted = !!phoneNumber, 
        enrolmentCompleted = status===1;

  if (inProgress)
    return <InProgressEnrolment {...props}/>

  if (enrolmentCompleted)
    return <ManageEnrolment {...props}/>
  
  if (enrolmentStarted)
    return <VerifyEnrolment {...props}/>
  
  return <StartEnrolment {...props}/>
}

SMSEnrolment.propTypes = {
  smsEnrolment: PropTypes.object.isRequired,
};

export default SMSEnrolment;