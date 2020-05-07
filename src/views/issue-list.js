import React from "react";

import CustomMaterialTable from "../components/commons/MaterialTable";

export default function IssueList({ isAdmin, setTitle }) {
  setTitle("Lista de Issues activos");
  return <CustomMaterialTable isAdmin={isAdmin} />;
}
