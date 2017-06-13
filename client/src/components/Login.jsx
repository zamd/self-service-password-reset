import React from 'react'
import {Button} from '@auth0/styleguide-react-components'

const Login = props => (
    <div className="auth0-react-styleguide">
    <div className="styleguide-content">
        <section className="react-component-page">
        <div className="component-information">
            <h1 className="component-title">Login</h1>
            <p className="component-description">
            Login with your Auth0 account</p>
            <br/>
            <Button bsStyle="info" onClick={()=>props.onLogin()}>Login</Button>
        </div>
        </section>
    </div>
    </div>
)

export default Login
