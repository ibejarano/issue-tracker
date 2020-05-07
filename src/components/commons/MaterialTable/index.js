import React, { useRef } from "react";
import { issuesHandler } from "../../../handlers/issues";
import MaterialTable from "material-table";
import issueData from "./issues-options";

export default function CustomMaterialTable({ status, isAdmin }) {
  const tableRef = useRef();
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

  const handleArchive = async (issueRow) => {
    try {
      const newData = { ...issueRow, status: "Cerrado" };
      await issuesHandler.update(issueRow._id, newData);
    } catch (err) {
      alert.log(err.toString());
    }
  };

  return (
    <MaterialTable
      title=""
      tableRef={tableRef}
      columns={issueData}
      data={(query) =>
        new Promise((resolve, reject) => {
          const { pageSize, page } = query;
          issuesHandler
            .getAll(pageSize, page, status)
            .then(({ data }) => {
              console.log("Refreshing...", data);
              resolve({
                data: data.issues,
                page: data.page,
                totalCount: data.totalCount,
              });
            })
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
          onClick: (_, issueRow) =>
            handleArchive(issueRow) &&
            tableRef.current &&
            tableRef.current.onQueryChange(),
        },
        {
          icon: "refresh",
          tooltip: "Actualizar",
          isFreeAction: true,
          onClick: () => tableRef.current && tableRef.current.onQueryChange(),
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
