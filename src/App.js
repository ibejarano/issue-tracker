import React, { useState } from "react";
import "./App.css";
import { history } from "./helpers/history";
import { Router, Route, Switch } from "react-router-dom";

import UserRegisterForm from "./views/register";
import Login from "./views/login";
import HomePage from "./views/home";

export default function App() {
  const storedUser = localStorage.getItem("issue-tracker-user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const [user, setUser] = useState(parsedUser);

  if (!user) {
    history.push("/login");
  } else {
    history.push("/");
  }

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route exact path="/signup">
          <UserRegisterForm />
        </Route>
        <Route path="/">
          <HomePage user={user} />
        </Route>
      </Switch>
    </Router>
  );
}
