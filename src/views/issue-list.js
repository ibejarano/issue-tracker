import React, { useState } from "react";
import { Button, Drawer } from "@material-ui/core";

import CustomMaterialTable from "../components/commons/MaterialTable";

export default function IssueList({ isAdmin, setTitle }) {
  const [openDrawer, setOpenDrawer] = useState(false);

  setTitle("Lista de Issues activos");

  const handleAddIssue = () => {
    setOpenDrawer(true);
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
        <Button onClick={handleAddIssue}>Open</Button>
        <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
          Hola mundo!
        </Drawer>
      </React.Fragment>
    </>
  );
}
