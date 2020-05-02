import React, { useState, useEffect } from "react";
import {useLocation} from "react-router-dom"
import { issuesHandler } from "../handlers/issues";
import { userHandler } from "../handlers/users";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  formControl: {
    marginTop: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function createOptionTags(opt, idx) {
  return (
    <MenuItem key={idx} value={opt}>
      {" "}
      {opt}{" "}
    </MenuItem>
  );
}

export default function EditIssue(props) {
  const classes = useStyles();
  const [issueType, setIssueType] = useState("");
  const [priority, setPriority] = useState("");
  const [issueTitle, setIssueTitle] = useState("");
  const [status, setStatus] = useState("");
  const [assignees, setAsignees] = useState([""]);
  const [assignee, setAssignee] = useState("");
  const location = useLocation();
  const id = location.search.split("=")[1];

  const handleIssueChange = e => {
    setIssueType(e.target.value);
  };

  const handlePriorityChange = e => {
    setPriority(e.target.value);
  };

  const handleStatusChange = e => {
    setStatus(e.target.value);
  };

  const handleIssueTitleChange = e => {
    setIssueTitle(e.target.value);
  };

  const handleAssigneeChange = e => {
    setAssignee(e.target.value);
  };

  const onSubmit = async function(e) {
    e.preventDefault();
    const params = {
      priority,
      type: issueType,
      status,
      title: issueTitle,
      assignee
    };
    try {
      await issuesHandler.update(id, params);
      props.history.push("/user/issue-log");
    } catch (error) {
      console.log("And error ocurred during update", error.toString());
    }
  };

  useEffect(() => {
    if (issueType === "") {
      try {
        async function fetchData() {
          const { issue } = await issuesHandler.getById(id);
          setIssueType(issue.type);
          setPriority(issue.priority);
          setIssueTitle(issue.title);
          setStatus(issue.status);
          setAssignee(issue.assignee);
          const users = await userHandler.getAllUsers();
          setAsignees(users);
        }
        fetchData();
      } catch (error) {
        console.log(error.toString());
      }
    }
  });

  const issueTypeOptions = ["Bug", "Tarea", "Mejora", "Propuesta"].map(
    createOptionTags
  );
  const priorityOptions = ["Baja", "Media", "Alta", "Urgente!"].map(
    createOptionTags
  );
  const statusOptions = ["Nuevo", "Abierto", "Cerrado", "Pausado"].map(
    createOptionTags
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit Issue
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <FormControl className={classes.formControl} fullWidth required>
            <InputLabel>Type</InputLabel>
            <Select
              value={issueType}
              onChange={handleIssueChange}
              className={classes.selectEmpty}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {issueTypeOptions}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>

          <FormControl className={classes.formControl} fullWidth required>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              onChange={handlePriorityChange}
              className={classes.selectEmpty}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {priorityOptions}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>

          <FormControl className={classes.formControl} fullWidth required>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={handleStatusChange}
              className={classes.selectEmpty}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {statusOptions}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>

          <TextField
            required
            fullWidth
            onChange={handleIssueTitleChange}
            label="Issue Title"
            className={classes.textField}
            margin="normal"
            value={issueTitle}
          />

          <FormControl className={classes.formControl} fullWidth required>
            <InputLabel>Assignee</InputLabel>
            <Select
              value={assignee}
              onChange={handleAssigneeChange}
              className={classes.selectEmpty}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {assignees.map((assignee, idx) => {
                return (
                  <MenuItem key={idx} value={assignee._id}>
                    {assignee.username}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Confirm Changes
          </Button>
        </form>
      </div>
    </Container>
  );
}
