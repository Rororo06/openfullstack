import PropTypes from 'prop-types'

const App = ({ store }) => {
  const { good, ok, bad } = store.getState()
  const total = good + ok + bad

  const dispatchType = type => () => store.dispatch({ type })

  return (
    <div>
      <button onClick={dispatchType('GOOD')}>good</button>
      <button onClick={dispatchType('OK')}>ok</button>
      <button onClick={dispatchType('BAD')}>bad</button>
      <button onClick={dispatchType('ZERO')}>reset stats</button>
      <div>good {good}</div>
      <div>ok {ok}</div>
      <div>bad {bad}</div>
      <div>total {total}</div>
    </div>
  )
}

App.propTypes = {
  store: PropTypes.shape({
    getState: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
}

export default App
