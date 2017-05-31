import React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import * as counterActions from '../../actions/counter'
import home from './home.css'

const Home = props => (
  <div>
    <h1>Home</h1>
    <p>Count: {props.counter.get('count')}</p>

    <p>
      <button className="btn btn-default" onClick={props.increment} disabled={props.counter.get('isIncrementing')}>Increment</button> 
      <button className="btn btn-default" onClick={props.incrementAsync} disabled={props.counter.get('isIncrementing')}>Increment Async</button>
    </p>

    <p>
      <button className="btn btn-default" onClick={props.decrement} disabled={props.counter.get('isDecrementing')}>Decrementing</button> 
      <button className="btn btn-default" onClick={props.decrementAsync} disabled={props.counter.get('isDecrementing')}>Decrement Async</button>
    </p>

    <p><a onClick={() => props.changePage()}>Go to about page via redux</a></p>
  </div>
)

const mapStateToProps = state => ({
  counter: state.counter,
})

export default connect(mapStateToProps,  {...counterActions, changePage: () => push('/about-us')  })(Home)