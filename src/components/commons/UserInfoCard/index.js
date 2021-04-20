import React from "react";

import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import LoadingCicle from "../../loading";
import ChangePasswordDialog from "../../user/change-password";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function UserInfoCard({ user }) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  if (!user) {
    return <LoadingCicle />;
  }

  return (
    <Paper className={fixedHeightPaper}>
      <Typography variant="h6" >Informacion del usuario</Typography>
      <Typography>Nombre de usuario: {user.username}</Typography>
      <Typography>E-mail: {user.email}</Typography>
      <ChangePasswordDialog />
    </Paper>
  );
}
