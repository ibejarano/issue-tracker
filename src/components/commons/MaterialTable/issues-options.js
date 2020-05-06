import React from "react";
import { Link } from "react-router-dom";
import { getIsoDate } from "../../../helpers/formatDate";

import {
  issueTypesMap,
  prioritiesMap,
  statusTypesMap,
} from "../../../helpers/issueOptions";

const issueData = [
  {
    title: "Titulo",
    field: "title",
    render: (rowData) => (
      <Link to={`/user/issue?q=${rowData._id}`}>{rowData.title}</Link>
    ),
  },
  { title: "Estado", field: "status", lookup: statusTypesMap },
  { title: "Tipo", field: "type", lookup: issueTypesMap },
  { title: "Responsable", field: "assignee.username" },
  { title: "Prioridad", field: "priority", lookup: prioritiesMap },
  {
    title: "Creado",
    field: "createdAt",
    render: (rowData) => getIsoDate(rowData.createdAt),
  },
  {
    title: "Actualizado",
    field: "updatedAt",
    render: (rowData) => getIsoDate(rowData.updatedAt),
  },
];

export default issueData;
