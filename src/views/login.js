import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { authenticationService } from "../handlers/authentication";

// Material ui components
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
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

export default function LoginPage({ setUser }) {
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
      </div>
    </Container>
  );
}
