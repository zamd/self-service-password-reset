import React from 'react'
import {connect} from 'react-redux'
import {Button, Alert} from '@auth0/styleguide-react-components';
import MessageAlert from '../components/MessageAlert';
import {passwordActions} from '../actions'


const ResetPassword = (props) => {
  const {resetPassword, clearResetAlert, userId, accessToken, errorMessage, infoMessage, inProgress} = props;
  let oldPassword, newPassword, confirmPassword;
  return (
    <section className="react-component-page">
      <div className="component-information">
        <h1 className="component-title">Reset Password</h1>
        <p className="component-description">Please choose a new password to reset</p>
      </div>
      {errorMessage || infoMessage ?
      <MessageAlert {...props} clearAlert={clearResetAlert}/> 
      : <div/>
      }
      <div className="row" style={{
        "margin-top": 25
      }}>
        <div className="col-xs-4">
          <div className="form-group">
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
          <Button disabled={inProgress} onClick={()=>resetPassword(userId, newPassword.value,confirmPassword.value, accessToken)}>Reset</Button>
        </div>
      </div>
    </section>
  )
}
const mapStateToProps = state => {
  const { accessToken, profile:{sub} } = state.auth.toJS();
  const { error, infoMessage, inProgress } = state.passwordReset.toJS();
  return { userId: sub, accessToken, errorMessage: error.description, infoMessage, inProgress }
}

export default connect(mapStateToProps, passwordActions)(ResetPassword)