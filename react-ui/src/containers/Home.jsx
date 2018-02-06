import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { enrolmentActions } from '../actions';
import home from './home.css'
import { hasEnrolmentScope } from '../utils/helpers'


import Profile from '../components/profile'

class Home extends Component {
  componentDidMount() {
    const { loadEnrolments, accessToken, showEnrolment } = this.props;
    if(showEnrolment === true){
      loadEnrolments(accessToken);
    }
  }

  render() {
    return (
      <Profile {...this.props} />
    )
  }
};

const mapStateToProps = state => ({
  profile: state.auth.toJS().profile,
  emailEnrolment: state.emailEnrolment.toJS(),
  smsEnrolment: state.smsEnrolment.toJS(),
  accessToken: state.auth.toJS().accessToken,
  showEnrolment: hasEnrolmentScope(state.auth.toJS().scope)
})

export default connect(mapStateToProps, { ...enrolmentActions, linkToEnrolSms: () => push('enrolment/setup/sms'), linkToEnrolEmail: () => push('enrolment/setup/email') })(Home)