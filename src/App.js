import { BrowserRouter } from 'react-router-dom';
import './css/main.css';
import { Provider } from 'react-redux';
import Router from './router/Router';
import store from './redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
