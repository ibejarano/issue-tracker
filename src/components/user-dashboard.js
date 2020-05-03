import React, { useState, useEffect } from "react";
import { userHandler } from "../handlers/users";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import IssueList from "./issue/cards/table";
import LoadingCicle from "./loading";
import ChangePasswordDialog from "./user/change-password";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
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

export default function UserHome({ user }) {
  const classes = useStyles();
  const [issues, setIssues] = useState([]);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  console.log(user);
  useEffect(() => {
    async function fetchData() {
      const res = await userHandler.getUserInfo();
      const { issues } = res;
      setIssues(issues);
    }
    console.log("effect running");
    fetchData();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          {user.username === "" ? (
            <LoadingCicle />
          ) : (
            <div>
              <Typography>Informacion del usuario</Typography>
              <Typography>Nombre de usuario: {user.username}</Typography>
              <Typography>E-mail: {user.email}</Typography>
            </div>
          )}
          <ChangePasswordDialog />
        </Paper>
      </Grid>

      <Grid item xs={12} md={8} lg={9}>
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
      </Grid>
      <Grid item xs={12}>
        {user.username && issues.length === 0 ? (
          <Paper>
            <h2> No tenes ningun Issue asignado </h2>
          </Paper>
        ) : (
          <IssueList
            loading={user.username ? true : false}
            issues={issues}
            showAssignee={false}
          />
        )}
      </Grid>
    </Grid>
  );
}
