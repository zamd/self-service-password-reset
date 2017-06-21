import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@auth0/styleguide-react-components';
import {StartEnrolment, InProgressEnrolment, VerifyEnrolment, ManageEnrolment} from './enrolment/sms'

const SMSEnrolment = (props) => {
  console.log(props);
  const {smsEnrolment} = props;
  const {phoneNumber, isEnrolled, inProgress} = smsEnrolment;
  const enrolmentStarted = isEnrolled === false && !!phoneNumber, 
        enrolmentCompleted = isEnrolled;

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