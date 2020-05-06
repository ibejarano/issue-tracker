import React from "react";
import { Link } from "react-router-dom";
import { issuesHandler } from "../../../handlers/issues";
import MaterialTable from "material-table";
import { getIsoDate } from "../../../helpers/formatDate";

const issueCols = [
  {
    title: "Titulo",
    field: "title",
    render: (rowData) => (
      <Link to={`/user/issue?q=${rowData._id}`}>{rowData.title}</Link>
    ),
  },
  { title: "Estado", field: "status" },
  { title: "Tipo", field: "type" },
  { title: "Responsable", field: "assignee.username" },
  { title: "Prioridad", field: "priority" },
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

export default function CustomMaterialTable({ status, isAdmin }) {
  const handleDelete = async (issueRow) => {
    try {
      await issuesHandler.deleteById(issueRow._id);
      const data = await issuesHandler.getArchived();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MaterialTable
      title=""
      columns={issueCols}
      data={(query) =>
        new Promise((resolve, reject) => {
          const { pageSize, page } = query;
          issuesHandler
            .getAll(pageSize, page, status)
            .then(({ data }) =>
              resolve({
                data: data.issues,
                page: data.page,
                totalCount: data.totalCount,
              })
            )
            .catch((err) => reject(err.toString()));
        })
      }
      editable={
        isAdmin
          ? {
              onRowDelete: handleDelete,
            }
          : {}
      }
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
