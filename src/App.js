import { HashRouter } from 'react-router-dom';
import './css/main.css';
import { Provider } from 'react-redux';
import Router from './router/Router';
import store from './redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <HashRouter>
          <Router />
        </HashRouter>
      </Provider>
    </div>
  );
}

export default App;
