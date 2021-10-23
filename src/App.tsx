import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import UsersPage from './pages/users.page';

const App: React.FC = () => (
  <Switch>
    <Route exact path="/">
      <UsersPage />
    </Route>
  </Switch>
)


export default App;