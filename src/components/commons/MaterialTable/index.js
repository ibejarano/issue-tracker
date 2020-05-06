import React from "react";
import { issuesHandler } from "../../../handlers/issues";
import MaterialTable from "material-table";
import issueData from './issues-options'

export default function CustomMaterialTable({ status, isAdmin }) {
  const handleDelete = async (issueRow) => {
    try {
      await issuesHandler.deleteById(issueRow._id);
      await issuesHandler.getArchived();
    } catch (err) {
      console.log(err);
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

  const handleArchive = async (e, issueRow) => {
    try {
      const newData = { ...issueRow, status: "Cerrado" };
      console.log("data de handlearchive", newData);
      await issuesHandler.update(issueRow._id, newData);
    } catch (err) {
      alert.log(err.toString());
    }
  };

  return (
    <MaterialTable
      title=""
      columns={issueData}
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
