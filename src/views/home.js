import React from "react";
import { Route, Switch } from "react-router-dom";

import IssueLog from "../components/issue-log";
import IssueDetails from "../components/issue-details";
import IssueArchive from "../components/issue-archive";
import ReportIssue from "../components/issue-report";
import UserList from "../components/admin/user-list";
import Dashboard from "../components/user-dashboard";
import Sidebar from "../components/sidebar";
import Componentbar from "../components/componentbar";

export default function Home(props) {
  const match = {
    path: "/",
  };
  const [open, setOpen] = React.useState(false);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const { user } = props;
  const { isAdmin } = user;

  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <RouteWrapper section="Dashboard" open={open} handler={toggleOpen}>
          <Dashboard user={user} />
        </RouteWrapper>
      </Route>
      <Route path={`${match.path}/issue`}>
        <RouteWrapper
          section="Issue Details"
          open={open}
          handler={toggleOpen}
          isAdmin={isAdmin}
        >
          <IssueDetails isAdmin={isAdmin} />
        </RouteWrapper>
      </Route>
      <Route exact path={`${match.path}/issue-log`}>
        <RouteWrapper
          section="Lista de Issues"
          open={open}
          handler={toggleOpen}
          isAdmin={isAdmin}
        >
          <IssueLog isAdmin={isAdmin} />
        </RouteWrapper>
      </Route>
      <Route exact path={`${match.path}/issue-archive`}>
        <RouteWrapper
          section="Issues Archivados"
          open={open}
          handler={toggleOpen}
          isAdmin={isAdmin}
        >
          <IssueArchive isAdmin={isAdmin} />
        </RouteWrapper>
      </Route>
      <Route exact path={`${match.path}/list`}>
        <RouteWrapper
          section="Lista de usuarios"
          open={open}
          handler={toggleOpen}
          isAdmin={isAdmin}
        >
          <UserList />
        </RouteWrapper>
      </Route>
      <Route exact path={`${match.path}/report-issue`}>
        <RouteWrapper
          section="Reportar nuevo Issue"
          open={open}
          handler={toggleOpen}
          isAdmin={isAdmin}
        >
          <ReportIssue />
        </RouteWrapper>
      </Route>
    </Switch>
  );
}

function RouteWrapper({ children, section, open, handler, isAdmin }) {
  return (
    <Sidebar handleClick={handler} open={open} isAdmin={isAdmin}>
      <Componentbar section={section} open={open} />
      {children}
    </Sidebar>
  );
}
