import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import Paper from "@material-ui/core/Paper";
import LoadingCicle from "../../loading";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Activity({ user }) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  if (!user) {
    return <LoadingCicle />;
  }

  return (
    <Paper className={fixedHeightPaper}>
      <Typography variant="h6">Actividad</Typography>
      {user.activities.map((activity, idx) => {
        return <Typography key={idx}>{activity}</Typography>;
      })}
    </Paper>
  );
}
