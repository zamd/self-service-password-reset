import React from 'react'
import {Button} from '@auth0/styleguide-react-components'
import Loading from './Loading'

const Login = ({login, inProgress}) => (
    <div className="auth0-react-styleguide">
        <div className="styleguide-content">
            <section className="react-component-page">
                <Loading show={inProgress}>
                    <div className="component-information">
                        <h1 className="component-title">Login</h1>
                        <p className="component-description">
                            Login with your Auth0 account</p>
                        <br/>
                        <Button bsStyle="info" onClick={login}>Login</Button>
                    </div>
                </Loading>
            </section>
        </div>
    </div>
)

export default Login
