import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import EnrolmentManagement from '../components/EnrolmentManagement';
import EnrolmentSetup from '../components/EnrolmentSetup';
import * as enrolmentActions from '../actions/enrolment';
import { NavLink, Route } from 'react-router-dom';

class Enrolment extends Component {

  render() {
    const { match } = this.props;
    const enrolmentSetupComponent = () => <EnrolmentSetup {...this.props} />;
    const enrolmentManagementComponent = () => <EnrolmentManagement  {...this.props} />;
    return (
      <section className="react-component-page">
        <div className="component-information">
          <h1 className="component-title">Enrolment</h1>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6">
              <NavLink activeClassName="selected" to={`${match.url}/setup`}>
                <article className="card-docs">
                  <i className="card-docs-icon icon-budicon-106 orange"></i>
                  <h1 className="card-docs-title">Setup</h1>
                </article>
              </NavLink>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-6">
              <NavLink activeClassName="selected" to={`${match.url}/management`}>
                <article className="card-docs">
                  <i className="card-docs-icon icon-budicon-106 orange"></i>
                  <h1 className="card-docs-title">Management</h1>
                </article>
              </NavLink>
            </div>
          </div>
        </div>

        <Route path={`${match.url}/setup`} component={enrolmentSetupComponent} />
        <Route path={`${match.url}/management`} component={enrolmentManagementComponent} />
      </section>
    )
  }
}

const mapStateToProps = state => ({ enrolment: state.enrolment })

export default connect(mapStateToProps, { ...enrolmentActions })(Enrolment)