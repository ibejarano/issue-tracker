import React, { useState, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { history } from "./helpers/history";
import { userHandler } from "./handlers/users";

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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = false;
  const [title, setTitle] = useState("Bienvenido!");

  if (!user) {
    history.push("/login");
  }

  useEffect(() => {
    async function fetchData() {
      const { user } = await userHandler.getUserInfo();
      if (user) {
        setUser(user);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading Screen...</div>;

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login">
          <Login history={history} setUser={setUser} user={user} />
        </Route>
        <Layout isAdmin={isAdmin} title={title}>
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
        </Layout>
      </Switch>
    </Router>
  );
}
