
import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading';

const EnrollmentStatus = ({ smsEnrolment, emailEnrolment, linkToEnrolEmail, linkToEnrolSms }) => {
  return (
    <div className='col-sm-6'>
      <h1 className="component-title">Enrollment Status</h1>
      <p className="component-description">Status of your enrollments</p>

      <h4>Email</h4>
      <div>  {smsEnrolment.inProgress
        ? <Loading show={true} size={'xs'} />
        : <span>
          {emailEnrolment.isEnrolled
            ? <div>
              <div>Enrolled with <strong> {`${emailEnrolment.profile.email}`} </strong> <a onClick={() => linkToEnrolEmail()}>Edit</a> </div>
            </div>
            : <div> <a onClick={() => linkToEnrolEmail()}>Configure</a> enrollment </div>
          }
        </span>
      }</div>

      <h4>SMS</h4>
      <div>
        {smsEnrolment.inProgress
          ? <Loading show={true} size={'xs'} />
          : <span>
            {smsEnrolment.isEnrolled
              ? <div>
                <div>Enrolled with <strong> {`${smsEnrolment.profile.phoneNumber}`} </strong>  <a onClick={() => linkToEnrolSms()}>Edit</a> </div>
              </div>
              : <div> <a onClick={() => linkToEnrolSms()}>Configure</a> enrollment </div>
            }
          </span>
        }
      </div>
    </div>);
}

EnrollmentStatus.propTypes = {
  smsEnrolment: PropTypes.object.isRequired,
  emailEnrolment: PropTypes.object.isRequired
};

export default EnrollmentStatus;