import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@auth0/styleguide-react-components';
import Info from './Info';
import EnrollmentStatus from './EnrollmentStatus';

const Profile = ({ profile, linkToEnrolSms, linkToEnrolEmail, emailEnrolment, smsEnrolment, showEnrolment }) => {
  return (
    <div>
      <section className="jumbotron">
        { profile.picture &&  <h2><img src={profile.picture  } alt={profile.email} /></h2>   }
        <h1>Welcome { profile.name || profile.email }</h1>
        <p>This Self-service portal allows you to link a secondary/personal identity with your Active Direcory (AD) account. Once you are succesfully enrolled you can login with secondary identity to reset password or unlock your AD account.</p>
      </section>

      <section className="react-component-page">
        <div className="component-information">
          <div className="row">
            <Info profile={profile} />
            { showEnrolment && <EnrollmentStatus smsEnrolment={smsEnrolment} emailEnrolment={emailEnrolment} linkToEnrolEmail={linkToEnrolEmail} linkToEnrolSms={linkToEnrolSms} /> }   
          </div>
        </div>
      </section>
    </div>
  )
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  linkToEnrolSms: PropTypes.func.isRequired,
  linkToEnrolEmail: PropTypes.func.isRequired,
  emailEnrolment: PropTypes.object.isRequired,
  smsEnrolment: PropTypes.object.isRequired
};

export default Profile;