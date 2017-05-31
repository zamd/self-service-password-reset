import React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import * as counterActions from '../../actions/counter'
import home from './home.css'

import Counter from '../../components/Counter'

const Home = props => (
  <div>
    <h1>Home</h1>
    
    <Counter {...props} />
    
    <p><a onClick={() => props.changePage()}>Go to about page via redux</a></p>
  </div>
)

const mapStateToProps = state => ({
  counter: state.counter,
})

export default connect(mapStateToProps, { ...counterActions, changePage: () => push('/about-us') })(Home)