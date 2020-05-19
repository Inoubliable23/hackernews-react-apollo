import React from 'react';
import { Switch, Route } from 'react-router';
import LinkList from './components/LinkList/LinkList.component';
import CreateLink from './components/CreateLink/CreateLink.component';
import Header from './components/Header/Header.component';
import Login from './components/Login/Login.component';

function App() {
  return (
		<div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={LinkList} />
          <Route exact path="/create" component={CreateLink} />
					<Route exact path="/login" component={Login} />
        </Switch>
      </div>
    </div>
  );
}

export default App;