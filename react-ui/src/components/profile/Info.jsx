import React from 'react';
import PropTypes from 'prop-types';

const Info = ({profile}) => {
  return (
    <div className='col-sm-6'>
      <h1 className="component-title">Profile Information</h1>
      <p className="component-description">Your profile information</p>
      <dl className="dl-horizontal">
        { profile.nickname && 
          <span>
            <dt>Nickname</dt>
            <dd>{profile.nickname}</dd>
          </span>
        }
        
        { profile.email && 
          <span>
            <dt>Email</dt>
            <dd>{profile.email}</dd>
          </span>
        }

        { (typeof profile.email_verified !== 'undefined' ) && 
          <span>
              <dt>Email verified</dt>
              <dd>{profile.email_verified ? 'Yes' : 'No'}</dd>
          </span>
        }

        { profile.updated_at && 
          <span>
            <dt>Updated at</dt>
            <dd>{new Date(profile.updated_at).toDateString()}</dd>
          </span>
        }
      </dl>
    </div>
  );
}

Info.propTypes = {
  profile: PropTypes.object.isRequired
};

export default Info;