import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import LoadingCicle from "../../loading";
import ChangePasswordDialog from "../../user/change-password";

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
