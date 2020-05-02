import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function UserInfoCard({ user }) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Paper className={fixedHeightPaper}>
      {user.username === "" ? (
        <LoadingCicle />
      ) : (
        <React.Fragment>
          <Typography>Informacion del usuario</Typography>
          <Typography>Nombre de usuario: {user.username}</Typography>
          <Typography>E-mail: {user.email}</Typography>
        </React.Fragment>
      )}
      <ChangePasswordDialog />
    </Paper>
  );
}
