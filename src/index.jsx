import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

// import App from './component/App';
import SearchPage from './containers/SearchPage';
import reducer from './reducers/index';

ReactDOM.render(
  <SearchPage
    history={history}
    location={location}
    store={createStore(reducer)}
  />,
  document.querySelector('.container'),
);
