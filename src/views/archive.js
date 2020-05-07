import React from "react";

import CustomMaterialTable from "../components/commons/MaterialTable";

export default function IssueList({ isAdmin, setTitle }) {
  setTitle("Issues Archivados");
  return <CustomMaterialTable isAdmin={isAdmin} status="Cerrado" />;
}
