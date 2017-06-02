import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@auth0/styleguide-react-components';

export default class SMSEnrolment extends Component {
  static propTypes = {
    enroll: PropTypes.func.isRequired,
    enrolment: PropTypes.object.isRequired
  };
  render() {
    const { enroll, enrolment } = this.props;
    return (
      <div>
        <p>
          <Button disabled={enrolment.get('inProgress')} onClick={enroll}>Enroll SMS</Button>
        </p>
      </div>
    );
  }
}