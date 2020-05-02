import React, { useState } from "react";
import "./App.css";
import { history } from "./helpers/history";
import { Router, Route, Switch } from "react-router-dom";

import UserRegisterForm from "./views/register";
import Login from "./views/login";
import HomePage from "./views/home";

export default function App() {
  const [user, setUser] = useState({ isAdmin: false });
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <Login setUser={setUser} />
        </Route>
        <Route exact path="/signup" component={UserRegisterForm} />
        <Route path="/user">
          <HomePage user={user} />
        </Route>
      </Switch>
    </Router>
  );
}
