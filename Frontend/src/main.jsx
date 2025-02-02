import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Context from './Store/Context'
import { Provider } from 'react-redux'
import store from './Redux/Store.jsx'

const root = createRoot(document.getElementById('root'));
root.render(

  <>
    <Provider store={store}>
      <Context>
        <App />
      </Context>
    </Provider>
  </>,
)
