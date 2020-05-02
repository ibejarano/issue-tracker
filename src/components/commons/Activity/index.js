import React from "react";

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

export default function Activity({ user }) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Paper className={fixedHeightPaper}>
      <h2>Actividad</h2>
      {user.username === "" ? (
        <LoadingCicle />
      ) : (
        <ul>
          {user.activities.map((activity, idx) => {
            return <li key={idx}>{activity}</li>;
          })}
        </ul>
      )}
    </Paper>
  );
}
