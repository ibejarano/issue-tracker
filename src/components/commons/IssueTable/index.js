import React from "react";
import { Link } from "react-router-dom";

import LoadingCircle from "../../loading";
import { getIsoDate } from "../../../helpers/formatDate";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
});

const HEADERS = [
  "Titulo",
  "Estado",
  "Tipo",
  "Prioridad",
  "Creado",
  "Actualizado",
];

export default function IssueTable({ issues, deleteIssue }) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {HEADERS.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {issues.length ? (
            issues.map((issue) => (
              <TableRow key={issue.title} hover>
                <TableCell component="th" scope="row">
                  <Link to={`/user/issue?q=${issue._id}`}>{issue.title}</Link>
                </TableCell>
                <TableCell align="right">{issue.type}</TableCell>
                <TableCell align="right">{issue.status}</TableCell>
                <TableCell align="right">{issue.priority}</TableCell>
                <TableCell align="right">
                  {getIsoDate(issue.createdAt)}
                </TableCell>
                <TableCell align="right">
                  {getIsoDate(issue.updatedAt)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7}>No hay Issues asignados</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}
