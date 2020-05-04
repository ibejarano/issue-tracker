import React from "react";
import { Route, Switch } from "react-router-dom";

import IssueLog from "../components/issue-log";
import IssueDetails from "../components/issue-details";
import IssueArchive from "../components/issue-archive";
import ReportIssue from "../components/issue-report";
import UserList from "../components/admin/user-list";
import Dashboard from "./dashboard";

import Layout from "../components/layout";

export default function Home({ user }) {
  const match = {
    path: "/",
  };

  const { isAdmin } = user;

  return (
    <Layout isAdmin={isAdmin}>
      <Switch>
        <Route exact path={`${match.path}`}>
          <Dashboard user={user} />
        </Route>
        <Route path={`${match.path}/issue`}>
          <IssueDetails isAdmin={isAdmin} />
        </Route>
        <Route exact path={`${match.path}/issue-log`}>
          <IssueLog isAdmin={isAdmin} />
        </Route>
        <Route exact path={`${match.path}/issue-archive`}>
          <IssueArchive isAdmin={isAdmin} />
        </Route>
        <Route exact path={`${match.path}/list`}>
          <UserList />
        </Route>
        <Route exact path={`${match.path}/report-issue`}>
          <ReportIssue />
        </Route>
      </Switch>
    </Layout>
  );
}
