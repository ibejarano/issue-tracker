import React, { useState } from "react";
import { Button, Drawer, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";

import CustomMaterialTable from "../components/commons/MaterialTable";
import AddIssue from "../components/issue-report";
import { issuesHandler } from "../handlers/issues";

const useStyles = makeStyles((theme) => ({
  drawerContainer: {
    padding: theme.spacing(4),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function IssueList({ isAdmin, setTitle }) {
  setTitle("Lista de Issues activos");
  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(false);

  const submitNewIssue = async (e, issue, title) => {
    e.preventDefault();
    const params = { ...issue, title };

    try {
      const res = await issuesHandler.add(params);
      if (res.status === 200) {
        toast.success("Nuevo issue reportado");
        setOpenDrawer(false);
      }
    } catch (error) {
      toast.error("Error" + error.toString());
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer(open);
  };

  return (
    <React.Fragment>
      <CustomMaterialTable isAdmin={isAdmin} />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Add>send</Add>}
        onClick={() => setOpenDrawer(true)}
      >
        Nuevo Issue
      </Button>
      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
        <div className={classes.drawerContainer}>
          <Typography variant="h6">Agregar nuevo issue</Typography>
          <AddIssue onSubmit={submitNewIssue} />
        </div>
      </Drawer>
    </React.Fragment>
  );
}
