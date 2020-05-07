import React from "react";
import { Link } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import BarChartIcon from "@material-ui/icons/BarChart";
import ArchiveIcon from "@material-ui/icons/Archive";
import { userHandler } from "../../handlers/users";

const mainList = [
  {
    name: "Dashboard",
    path: "",
    icon: <DashboardIcon />,
  },
  {
    name: "Lista de Issues",
    path: "issue-log",
    icon: <ListAltIcon />,
  },
  {
    name: "Issues Archivados",
    path: "issue-archive",
    icon: <ArchiveIcon />,
  },
  {
    name: "Reportar Issue",
    path: "report-issue",
    icon: <BarChartIcon />,
  },
];

const adminList = [
  {
    name: "Editar Usuario",
    path: "list",
    icon: <PeopleIcon />,
  },
];

function MaterialIconsList({ item }) {
  const { name, path, icon } = item;
  return (
    <Link to={`${path}`}>
      <ListItem button>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    </Link>
  );
}

async function logout() {
  try {
    console.log("Logging out");
    const res = await userHandler.logout();
    console.log(res);
    window.location = "/";
  } catch (error) {
    console.log(error.toString());
  }
}

export function mainListItems() {
  return (
    <React.Fragment>
      {mainList.map((item, idx) => (
        <MaterialIconsList item={item} key={idx} />
      ))}
    </React.Fragment>
  );
}

export function adminListItems() {
  return (
    <React.Fragment>
      <ListSubheader inset>Panel de Administrador</ListSubheader>
      {adminList.map((item, idx) => (
        <MaterialIconsList item={item} key={idx} />
      ))}
    </React.Fragment>
  );
}

export const logoutItem = (
  <div>
    <ListItem button onClick={logout}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Salir" />
    </ListItem>
  </div>
);
