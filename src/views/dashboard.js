import React from "react";

import UserInfoCard from "../components/commons/UserInfoCard";
import Activity from "../components/commons/Activity";
import IssueTable from "../components/commons/IssueTable";

export default function Dashboard({ user }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4} lg={3}>
        <UserInfoCard user={user} />
      </Grid>
      <Grid item xs={12} md={8} lg={9}>
        <Activity user={user} />
      </Grid>
      <Grid item xs={12}>
        <IssueTable issues={issues} />
      </Grid>
    </Grid>
  );
}
