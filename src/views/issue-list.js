import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { issuesHandler } from "../handlers/issues";
import MaterialTable from "material-table";
import { getIsoDate } from "../helpers/formatDate";
import {
  issueTypesMap,
  prioritiesMap,
  statusTypesMap,
} from "../helpers/issueOptions";

const issueCols = [
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

export default function IssueList({ isAdmin }) {
  const emptyIssue = {
    title: "",
    type: "",
    priority: "",
    state: "",
    assignee: "",
    updatedAt: "",
    createdAt: "",
  };
  const [issues, setIssues] = useState([emptyIssue]);

  const handleArchive = async (e, issueRow) => {
    try {
      const newData = { ...issueRow, status: "Cerrado" };
      console.log("data de handlearchive", newData);
      await issuesHandler.update(issueRow._id, newData);
      const { issues } = await issuesHandler.getAll();
      setIssues(issues);
    } catch (err) {
      alert.log(err.toString());
    }
  };

  const handleUpdate = async (newData, oldData) => {
    try {
      const id = oldData._id;
      await issuesHandler.update(id, newData);
    } catch (err) {
      alert(err.toString());
    }
  };

  return (
    <MaterialTable
      title=""
      columns={issueCols}
      data={(query) =>
        new Promise((resolve, reject) => {
          console.log(query);
          issuesHandler
            .getAll()
            .then(({ data }) =>
              resolve({ data: data.issues })
            )
            .catch((err) => reject(err.toString()));
        })
      }
      editable={
        isAdmin
          ? {
              onRowUpdate: handleUpdate,
            }
          : {}
      }
      actions={[
        {
          icon: "archive",
          tooltip: "Archivar Issue",
          onClick: handleArchive,
        },
      ]}
      localization={{
        header: {
          actions: "Acciones",
        },
        pagination: {
          labelDisplayedRows: "{from}-{to} de {count}",
        },
        body: {
          editRow: {
            deleteText: "Seguro que quieres borrar esto?",
            cancelTooltip: "Cancelar",
            saveTooltip: "Confirmar",
          },
        },
        toolbar: {
          searchTooltip: "Buscar",
          searchPlaceholder: "Buscar",
        },
      }}
    />
  );
}
