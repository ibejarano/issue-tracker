import React, { useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { history } from "./helpers/history";

import UserRegisterForm from "./views/register";
import Login from "./views/login";

import ReportIssue from "./components/issue-report";
import UserList from "./components/admin/user-list";
import Layout from "./components/layout";

import Dashboard from "./views/dashboard";
import IssueList from "./views/issue-list";
import IssueArchive from "./views/archive";
import IssueDetails from "./views/details";

export default function App() {
  const storedUser = localStorage.getItem("issue-tracker-user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const [user, setUser] = useState(null);

  const isAdmin = false;
  const [title, setTitle] = useState("Bienvenido!");

  if (!user) {
    history.push("/login");
  }

  return (
    <Router history={history}>
      <Layout isAdmin={isAdmin} title={title}>
        <Switch>
          <Route exact path="/login">
            <Login history={history} setUser={setUser} />
          </Route>
          <Route exact path="/signup">
            <UserRegisterForm />
          </Route>
          <Route exact path="/">
            <Dashboard user={user} setTitle={setTitle} />
          </Route>
            <Route path="/issue">
              <IssueDetails isAdmin={isAdmin} setTitle={setTitle} />
            </Route>
            <Route exact path={"/issue-log"}>
              <IssueList isAdmin={isAdmin} setTitle={setTitle} />
            </Route>
            <Route exact path={"/issue-archive"}>
              <IssueArchive isAdmin={isAdmin} setTitle={setTitle} />
            </Route>
            <Route exact path={"/list"}>
              <UserList setTitle={setTitle} />
            </Route>
            <Route exact path={"/report-issue"}>
              <ReportIssue setTitle={setTitle} />
            </Route>
        </Switch>
      </Layout>
    </Router>
  );
}
