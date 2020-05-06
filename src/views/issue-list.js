import React from "react";

import CustomMaterialTable from "../components/commons/MaterialTable";

export default function IssueList(props) {
  return <CustomMaterialTable isAdmin={props.isAdmin} />;
}
