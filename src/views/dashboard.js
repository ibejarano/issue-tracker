import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";

import { userHandler } from "../handlers/users";

import UserInfoCard from "../components/commons/UserInfoCard";
import Activity from "../components/commons/Activity";
import IssueTable from "../components/commons/IssueTable";

export default function Dashboard({ user }) {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await userHandler.getUserInfo();
      const { issues } = data;
      setIssues(issues);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4} lg={3}>
        <UserInfoCard user={user} />
      </Grid>
      <Grid item xs={12} md={8} lg={9}>
        <Activity user={user} />
      </Grid>
      <Grid item xs={12}>
        <IssueTable issues={issues} loading={loading} />
      </Grid>
    </Grid>
  );
}
