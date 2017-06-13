import React, { Component } from 'react'
import { connect } from 'react-redux'
import Auth0Auth from './Auth0Auth'


class EnsureLoggedIn extends Component {    
    render() {
        const {isAuthenticated} = this.props;
        if (!isAuthenticated)
            return <Auth0Auth/>
        return <div>{this.props.children}</div>
    }
}

const mapStateToProps = state => {
    const isAuthenticated = state.auth.toJS().accessToken
    return { isAuthenticated }
}

export default connect(mapStateToProps, null)(EnsureLoggedIn)
