import React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import * as counterActions from '../../actions/counter'
import home from './home.css'

import Counter from '../../components/Counter'

const Home = props => (
  <section className="react-component-page">
    <div className="component-information">
      <h1 className="component-title">Home</h1>
      <p className="component-description">Simple component for onboarding users to sections with no data.</p>
    </div>

    <Counter {...props} />

    <p><a onClick={() => props.changePage()}>Go to about page via redux</a></p>
  </section>
)

const mapStateToProps = state => ({
  counter: state.counter,
})

export default connect(mapStateToProps, { ...counterActions, changePage: () => push('/about-us') })(Home)