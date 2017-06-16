import React, {Component} from 'react'
import {push} from 'react-router-redux'
import {connect} from 'react-redux'
import SMSEnrolment from '../components/SMSEnrolment';
import EmailEnrolment from '../components/EmailEnrolment';
import {enrolmentActions} from '../actions';
import {Link, NavLink, Route} from 'react-router-dom';

class Enrolment extends Component {
    
    componentDidMount() {
        const {loadEnrolments, accessToken} = this.props;
        loadEnrolments(accessToken);
    }
    
    render() {
        const {match} = this.props;
        const smsEnrolmentComponent = () => <SMSEnrolment {...this.props}/>;
        const emailEnrolmentComponent = () => <EmailEnrolment {...this.props}/>;
        return (
            <section className="react-component-page">
                <div className="component-information">
                    <h1 className="component-title">Enrolment</h1>
                    <div>
                        <hr/>
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-6">
                                <Link to={`${match.url}/setup/sms`}>
                                    <article className="card-docs">
                                        <i className="card-docs-icon icon-budicon-106 orange"></i>
                                        <h2 className="card-docs-title">SMS</h2>
                                    </article>
                                </Link>
                            </div>

                            <div className="col-xs-12 col-sm-6 col-md-6">
                                <Link to={`${match.url}/setup/email`}>
                                    <article className="card-docs">
                                        <i className="card-docs-icon icon-budicon-106 orange"></i>
                                        <h2 className="card-docs-title">EMAIL</h2>
                                    </article>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Route path={`${match.url}/setup/sms`} component={smsEnrolmentComponent}/>
                <Route path={`${match.url}/setup/email`} component={emailEnrolmentComponent}/>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    emailEnrolment: state.enrolment.emailEnrolment.toJS(),
    smsEnrolment: state.enrolment.smsEnrolment.toJS(),
    accessToken: state.auth.toJS().accessToken
})

export default connect(mapStateToProps, {
    ...enrolmentActions
})(Enrolment)