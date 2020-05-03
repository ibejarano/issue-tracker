import React, { useState } from "react";
import "./App.css";
import { history } from "./helpers/history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import UserRegisterForm from "./views/register";
import Login from "./views/login";
import HomePage from "./views/home";

export default function App() {
  const storedUser = localStorage.getItem("issue-tracker-user");
  if (!storedUser) {
    history.push("/login");
  }

  const [user, setUser] = useState("");

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
