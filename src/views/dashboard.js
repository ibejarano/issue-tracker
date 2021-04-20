import React from "react";

import Grid from "@material-ui/core/Grid";

import Welcome from "../components/Welcome";
import UserInfoCard from "../components/commons/UserInfoCard";
import Activity from "../components/commons/Activity";

export default function Dashboard({ user, setTitle }) {
  setTitle("Dashboard");

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <Welcome />
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <UserInfoCard user={user} />
      </Grid>
      <Grid item xs={12} md={8} lg={9}>
        <Activity user={user} />
      </Grid>
    </Grid>
  );
}
