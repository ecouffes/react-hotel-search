import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';

import SearchPage from './SearchPage';
import AboutPage from './AboutPage';

const App = () => (
  <Router>
    <div className="app">
      <ul className="left-navi">
        <li><Link to="/">ホテル検索</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <Switch>
        {/* React Routerは、componentにpropsとして、 */}
        {/* match, location, history, staticContent を渡す。 */}
        {/* historyオブジェクトは、history APIのラッパーオブジェクト */}
        <Route exact path="/" component={SearchPage} />
        <Route exaxt path="/about" component={AboutPage} />
      </Switch>
    </div>
  </Router>
);

export default App;
