import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    padding: theme.spacing(0.5),
    backgroundColor: "white",
  },
  title: {
    color: "white",
    margin: "auto 0",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  chipAdmin: {
    margin: theme.spacing(0.5),
    color: "red",
  },
}));

export default function IssueInfoCard({ info, editIssueUrl }) {
  const { title, type, status, priority, assignee } = info;

  const username = assignee ? assignee.username : "No definido";

  const classes = useStyles();
  const chipData = [
    { key: 1, label: type, title: "Tipo" },
    { key: 2, label: status, title: "Estado" },
    { key: 3, label: priority, title: "Prioridad" },
    { key: 4, label: username, title: "Responsable" },
  ];
  console.log(editIssueUrl);

  return (
    <Paper className={classes.root}>
      {chipData.map((data) => {
        return (
          <Chip
            key={data.key}
            label={data.title + ": " + data.label}
            className={classes.chip}
          />
        );
      })}
      {editIssueUrl && (
        <Link to={editIssueUrl}>
          <Chip
            key="admin-chip"
            label="Edit Issue"
            className={classes.chipAdmin}
          />
        </Link>
      )}
    </Paper>
  );
}
