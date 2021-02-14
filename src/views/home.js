import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import ReportIssue from "../components/issue-report";
import UserList from "../components/admin/user-list";

import Dashboard from "./dashboard";
import IssueList from "./issue-list";
import IssueArchive from "./archive";
import IssueDetails from "./details";

import Layout from "../components/layout";

export default function Home({ user }) {
  const { isAdmin } = user;
  const [title, setTitle] = useState("Cargando ...");
  return (

  );
}
