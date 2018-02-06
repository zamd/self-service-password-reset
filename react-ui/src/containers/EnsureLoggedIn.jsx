import React, { Component } from 'react'
import { connect } from 'react-redux'
import Auth0Auth from './Auth0Auth'
import { push } from 'react-router-redux'
import {hasEnrolmentScope} from '../utils/helpers'

class EnsureLoggedIn extends Component {    
    render() {
        const {isAuthenticated, isAuthorized, dispatch} = this.props;
        
        if (!isAuthorized)
            dispatch(push('/'));

        if (!isAuthenticated)
            return <Auth0Auth {...this.props}/>
        return <div>{this.props.children}</div>
    }
}

const mapStateToProps = state => {
    const {accessToken, scope} = state.auth.toJS();
    const {location:{pathname}} = state.routing;

    const isAuthenticated = !!accessToken
    let isAuthorized = true;
    
    if (pathname.indexOf("/enrolment")>=0) //enrolment component is only accessible with following scopes
        isAuthorized = hasEnrolmentScope(scope);

    return { isAuthenticated, isAuthorized }
}

export default connect(mapStateToProps, null)(EnsureLoggedIn)
