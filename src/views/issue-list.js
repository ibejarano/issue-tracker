import React, { useState } from "react";
import { Button, Drawer, Typography } from "@material-ui/core";
import { toast } from "react-toastify";

import CustomMaterialTable from "../components/commons/MaterialTable";
import AddIssue from "../components/issue-report";
import { issuesHandler } from "../handlers/issues";

export default function IssueList({ isAdmin, setTitle }) {
  setTitle("Lista de Issues activos");
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
    <>
      <CustomMaterialTable isAdmin={isAdmin} />
      <React.Fragment>
        <Button onClick={() => setOpenDrawer(true)}>Open</Button>
        <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
          <Typography variant="h4">Agregar nuevo issue</Typography>
          <AddIssue onSubmit={submitNewIssue} />
        </Drawer>
      </React.Fragment>
    </>
  );
}
