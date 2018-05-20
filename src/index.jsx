import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

// action と reducerの間に入って処理を差し込める
// store.dispatchがcallされた時に、発行されたactionを検知しmiddlewareがチャッチ、reducerに渡す。
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// import App from './component/App';
import SearchPage from './component/SearchPage';
import reducer from './reducers/index';

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  // Provider がstoreをcontextへ格納
  <Provider store={store}>
    <SearchPage
      history={history}
      location={location}
    />
  </Provider>,
  document.querySelector('.container'),
);
