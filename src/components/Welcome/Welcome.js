import React from "react";

import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  fixedHeight: {
    height: 440,
  },
}));

export default function Welcome() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Paper className={fixedHeightPaper}>
      <Typography variant="h4">Bienvenido!</Typography>
      <Typography>
        Esta aplicacion tiene como proposito el de cumplir la funcion 'Issues'
        de GitHub.
      </Typography>
      <Typography variant="h6">Roadmap</Typography>
        <Typography>
            - Sistema de notificaciones cuando se realicen acciones
        </Typography>
        <Typography>
            - Agregar Issue desde una tabla deslizable
        </Typography>
        <Typography>
            - Mejor estilo para pagina de issue
        </Typography>
    </Paper>
  );
}
