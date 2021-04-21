import React, { useState } from "react";

import { issueTypes, priorities, statusTypes } from "../helpers/issueOptions";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";

import Button from "@material-ui/core/Button";

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
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formControl: {
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function createOptionTags(opt, idx) {
  return (
    <MenuItem key={idx} value={opt}>
      {" "}
      {opt}{" "}
    </MenuItem>
  );
}

export default function AddIssueForm({ onSubmit }) {
  const classes = useStyles();
  const [issueTitle, setIssueTitle] = useState("");
  const [issue, setIssue] = useState({
    type: "",
    priority: "",
    status: "Nuevo",
  });

  const handleChange = (e) => {
    setIssue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleText = (e) => {
    setIssueTitle(e.target.value);
  };

  const { type, priority, status } = issue;

  const issueTypeOptions = issueTypes.map(createOptionTags);
  const priorityOptions = priorities.map(createOptionTags);
  const statusOptions = statusTypes.map(createOptionTags);

  return (
    <form
      className={classes.form}
      onSubmit={(e) => onSubmit(e, issue, issueTitle)}
    >
      <FormControl className={classes.formControl} fullWidth required>
        <InputLabel>Tipo</InputLabel>
        <Select
          name="type"
          value={type}
          onChange={handleChange}
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>Nada</em>
          </MenuItem>
          {issueTypeOptions}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl} fullWidth required>
        <InputLabel>Prioridad</InputLabel>
        <Select
          name="priority"
          value={priority}
          onChange={handleChange}
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>Nada</em>
          </MenuItem>
          {priorityOptions}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl} fullWidth required>
        <InputLabel>Estado</InputLabel>
        <Select
          name="status"
          value={status}
          onChange={handleChange}
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>Nada</em>
          </MenuItem>
          {statusOptions}
        </Select>
      </FormControl>

      <TextField
        required
        fullWidth
        name="title"
        onChange={handleText}
        label="Titulo"
        className={classes.textField}
        value={issueTitle}
      />
      <FormHelperText> (*) Campo Obligatorio</FormHelperText>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Reportar
      </Button>
    </form>
  );
}
