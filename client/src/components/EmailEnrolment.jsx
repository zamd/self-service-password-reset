import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@auth0/styleguide-react-components';

export default class EmailEnrolment extends Component {
  static propTypes = {
    enroll: PropTypes.func.isRequired,
    enrolment: PropTypes.object.isRequired
  };
  render() {
    const { enroll, enrolment } = this.props;
    return (
      <div className="row" style={{ "margin-top": 25 }} >
        <div className="col-xs-12">
          <Button disabled={enrolment.get('inProgress')} onClick={enroll}>Enroll Email</Button>
        </div>
      </div>
    );
  }
}