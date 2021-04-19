import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
  errorText: {
    color: "red",
    backgroundColor: "pink",
    border: "1px solid",
    padding: "3px",
  },
}));

export default function Form({ handleSubmit, error }) {
  const [formFields, setFormFields] = useState({
    email: "admin@admin",
    password: "admin",
  });
  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };
  const classes = useStyles();
  return (
    <form
      className={classes.form}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(formFields);
      }}
    >
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="E-mail"
        name="email"
        value={formFields["email"]}
        onChange={handleChange}
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        value={formFields["password"]}
        onChange={handleChange}
      />
      {error && <p className={classes.errorText}>{error}</p>}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Log In
      </Button>
    </form>
  );
}
