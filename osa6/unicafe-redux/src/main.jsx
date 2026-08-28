import { createRoot } from 'react-dom/client'
import { createStore } from 'redux'

import App from './App'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const root = createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App store={store} />)
}

renderApp()
store.subscribe(renderApp)
