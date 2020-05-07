import React, { useState } from "react";

import { issuesHandler } from "../handlers/issues";
import { issueTypes, priorities, statusTypes } from "../helpers/issueOptions";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

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

export default function ReportBugForm(props) {
  props.setTitle("Agregar nuevo Issue");
  const classes = useStyles();
  const [issueType, setIssueType] = useState("");
  const [priority, setPriority] = useState("");
  const [issueTitle, setIssueTitle] = useState("");
  const [status, setStatus] = useState("Nuevo");

  const handleIssueChange = (e) => {
    setIssueType(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleIssueTitleChange = (e) => {
    setIssueTitle(e.target.value);
  };

  const onSubmit = async function (e) {
    e.preventDefault();
    const params = {
      priority,
      type: issueType,
      status,
      title: issueTitle,
    };
    try {
      const res = await issuesHandler.add(params);
      if (res.status === 200) {
        window.location = "/issue-log";
      }
    } catch (error) {
      console.log(error.toString());
    }
  };

  const issueTypeOptions = issueTypes.map(createOptionTags);
  const priorityOptions = priorities.map(createOptionTags);
  const statusOptions = statusTypes.map(createOptionTags);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={onSubmit}>
          <FormControl className={classes.formControl} fullWidth required>
            <InputLabel>Tipo</InputLabel>
            <Select
              value={issueType}
              onChange={handleIssueChange}
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
              value={priority}
              onChange={handlePriorityChange}
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
              value={status}
              onChange={handleStatusChange}
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
            onChange={handleIssueTitleChange}
            label="Titulo"
            className={classes.textField}
            margin="normal"
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
      </div>
    </Container>
  );
}
