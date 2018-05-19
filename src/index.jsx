import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

// import App from './component/App';
import SearchPage from './component/SearchPage';
import reducer from './reducers/index';

const store = createStore(reducer);

const render = () => {
  const state = store.getState();
  // console.log(state);

  ReactDOM.render(
    <SearchPage
      history={history}
      location={location}
      place={state.place}
      // store.dispatch(action)
      // 更新されるstateは、actionに持たせる
      // store.dispatchが呼ばれた時に、storeの第2引数へactionが渡される
      onPlaceChange={place => store.dispatch({ type: 'CHANGE_PLACE', place })}
    />,
    document.querySelector('.container'),
  );
};

render();

// storeが更新された時に、storeの内容を用いてReactDOM.renderを実行
store.subscribe(render);
