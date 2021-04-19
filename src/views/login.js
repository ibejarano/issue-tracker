import React, { useState } from "react";
import {
  Container,
  Link,
  Grid,
  CssBaseline,
  Avatar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link as RouterLink } from "react-router-dom";

import { authenticationService } from "../handlers/authentication";
import Form from "../components/commons/Form";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function LoginPage({ setUser, history, user }) {
  const classes = useStyles();
  const [error, setError] = useState(null);

  const handleSubmit = async (params) => {
    const { data, error } = await authenticationService.login(params);
    if (error) {
      setError(error);
    } else {
      localStorage.setItem("issue-tracker-user", JSON.stringify(data));
      setUser(data);
    }
  };

  if (user) {
    history.push("/");
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Form handleSubmit={handleSubmit} error={error} />
        <Grid container>
          <Grid item>
            <RouterLink to="/signup">
              {"No tiene cuenta? Registrese"}
            </RouterLink>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
