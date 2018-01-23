import React from 'react'
import {connect} from 'react-redux'
import {Button} from '@auth0/styleguide-react-components';
import MessageAlert from '../components/MessageAlert';
import {passwordActions} from '../actions'


const ChangePassword = (props) => {
  const { changePassword, errorMessage, infoMessage, inProgress, clearChangeAlert, accessToken, idToken, userId } = props;
  let oldPassword, newPassword, confirmPassword;
  return (
    <section className="react-component-page">
      <div className="component-information">
        <h1 className="component-title">Change Password</h1>
        <p className="component-description">Please enter your current password and choose a new password</p>
      </div>
      {errorMessage || infoMessage ?
      <MessageAlert {...props} clearAlert={clearChangeAlert}/> 
      : <div/>
      }
      <div className="row" style={{
        "margin-top": 25
      }}>
        <div className="col-xs-4">
          <div className="form-group">
            <label className="control-label" htmlFor="old_password">Current Password</label>
            <input
              type="password"
              className="form-control"
              name="old_password"
              placeholder="password"
              ref={(input)=>{oldPassword=input}}
              autoFocus/>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="new_password">New Password</label>
            <input
              type="password"
              className="form-control"
              name="new_password"
              ref={(input)=>{newPassword=input}}
              placeholder="new password"/>
            <input
              type="password"
              className="form-control"
              name="new_password_confirm"
              ref={(input)=>{confirmPassword=input}}
              placeholder="confirm password"/>
          </div>

        </div>
        <div className="col-xs-12">
          <Button disabled={inProgress} onClick={()=>changePassword(oldPassword.value, newPassword.value, confirmPassword.value, accessToken, idToken, userId)}>Change</Button>
        </div>
      </div>
    </section>
  )
}
const mapStateToProps = state => {
  const { accessToken, idToken, profile:{sub} } = state.auth.toJS();
  const { error, infoMessage, inProgress } = state.passwordChange.toJS();
  return { userId: sub, accessToken, errorMessage: error.description, infoMessage, inProgress, idToken }
}

export default connect(mapStateToProps, passwordActions)(ChangePassword)