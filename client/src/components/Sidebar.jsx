import React, { Component } from 'react';
import { Sidebar as SidebarRC, SidebarItem, SidebarSubitem } from '@auth0/styleguide-react-components';
import { Route, Link } from 'react-router-dom'
import {connect} from 'react-redux';
import { hasChangePasswordScope, hasEnrolmentScope, hasResetPasswordScope } from '../utils/helpers';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNavOpen: false,
      rCItemOpen: false
    }
  }

  toggleState(stateProp) {
    this.setState(prevState => ({ [stateProp]: !prevState[stateProp] }));
  }

  render() {
    const { mobileNavOpen, rCItemOpen } = this.state;
    const {showEnrolment, showChangePassword, showResetPassword} = this.props;
    return (
      <SidebarRC
        mobileNavOpen={mobileNavOpen}
        toggleNavOnClick={() => this.toggleState('mobileNavOpen')}
        header={
          <h1 className="default-title">
            <Link className="default-link" to="/">
              <img src="https://cdn.auth0.com/styleguide/components/1.0.8/media/logos/img/badge.svg" alt="Auth0 logo" width="30" />
            </Link>
          </h1>
        }
      >
        {showEnrolment && <SidebarItem text="Enrolment" icon={257} wrapper={<Link to="/enrolment" />} />}
        {showChangePassword && <SidebarItem text="Change Password" icon={258} wrapper={<Link to="/change-password" />} />}
        {showResetPassword && <SidebarItem text="Reset Password" icon={259} wrapper={<Link to="/reset-password" />} />}
        <SidebarItem text="Logout" wrapper={<Link to="/logout" />} />
        {/*<SidebarItem
          text="React components"
          icon={450}
          open={rCItemOpen}
          wrapper={<div onClick={() => this.toggleState('rCItemOpen')} />} // eslint-disable-line jsx-a11y/no-static-element-interactions
        >
          <SidebarSubitem text="Sub one" wrapper={<Link to="/" />} />
          <SidebarSubitem text="Sub one" wrapper={<Link to="/" />} />
        </SidebarItem>*/}
        
      </SidebarRC>
    )
  }
}
const mapStateToProps = state => {
  const { scope } = state.auth.toJS()
  return { showEnrolment: hasEnrolmentScope(scope), showChangePassword: hasChangePasswordScope(scope), showResetPassword: hasResetPasswordScope(scope) }
}
export default connect(mapStateToProps, null)(Sidebar)