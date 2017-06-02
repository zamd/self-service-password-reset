import React, { Component } from 'react';
import { Sidebar as SidebarRC, SidebarItem, SidebarSubitem } from '@auth0/styleguide-react-components';
import { Route, Link } from 'react-router-dom'

class Sidebar extends Component {

  state = {
    mobileNavOpen: false,
    rCItemOpen: false
  }

  toggleState = (stateProp) => {
    this.setState(prevState => ({ [stateProp]: !prevState[stateProp] }));
  }

  render() {
    const { mobileNavOpen, rCItemOpen } = this.state;
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
        <SidebarItem
          text="Home"
          icon={464}
          wrapper={<Link to="/" />}
        />
        <SidebarItem text="About" icon={258} wrapper={<Link to="/about-us" />} />
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

export default Sidebar;