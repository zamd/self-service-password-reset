import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@auth0/styleguide-react-components';
import {StartEnrolment, InProgressEnrolment, VerifyEnrolment, ManageEnrolment} from './enrolment/email'

const EmailEnrolment = (props) => { 
  const {emailEnrolment} = props;
  const {email, isEnrolled, inProgress} = emailEnrolment;
  const enrolmentStarted = isEnrolled === false && !!email,
        enrolmentCompleted = isEnrolled;

  if (inProgress)
    return <InProgressEnrolment {...props}/>

  if (enrolmentCompleted)
    return <ManageEnrolment {...props}/>
  
  if (enrolmentStarted)
    return <VerifyEnrolment {...props}/>
  
  return <StartEnrolment {...props}/>
};

EmailEnrolment.propTypes = {
  emailEnrolment: PropTypes.object.isRequired
};

export default EmailEnrolment;