import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import UserSpecificPage from './pages/user.specific.page';
import UsersCreatePage from './pages/users.create.page';
import UsersListPage from './pages/users.list.page';

const App: React.FC = () => (
  <Switch>
    <Route exact path="/">
      <UsersCreatePage />
    </Route>
    <Route exact path="/users">
      <UsersListPage />
    </Route>
    <Route path="/users/:id">
      <UserSpecificPage />
    </Route>
  </Switch>
)


export default App;