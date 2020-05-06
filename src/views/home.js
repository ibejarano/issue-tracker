import React from "react";
import { Route, Switch } from "react-router-dom";

import ReportIssue from "../components/issue-report";
import UserList from "../components/admin/user-list";

import Dashboard from "./dashboard";
import IssueList from "./issue-list";
import IssueArchive from "./archive";
import IssueDetails from "./details";

import Layout from "../components/layout";

export default function Home({ user }) {
  const { isAdmin } = user;

  return (
    <Layout isAdmin={isAdmin}>
      <Switch>
        <Route exact path="/">
          <Dashboard user={user} />
        </Route>
        <Route path="/issue">
          <IssueDetails isAdmin={isAdmin} />
        </Route>
        <Route exact path={"/issue-log"}>
          <IssueList isAdmin={isAdmin} />
        </Route>
        <Route exact path={"/issue-archive"}>
          <IssueArchive isAdmin={isAdmin} />
        </Route>
        <Route exact path={"/list"}>
          <UserList />
        </Route>
        <Route exact path={"/report-issue"}>
          <ReportIssue />
        </Route>
      </Switch>
    </Layout>
  );
}
