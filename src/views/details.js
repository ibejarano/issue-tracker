import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { issuesHandler } from "../handlers/issues";
import IssueInfoCard from "../components/commons/IssueInfoCard";
import Comments from "../components/commons/Comments";
import AddComment from "../components/commons/AddComment";

export default function IssueDetails({ isAdmin, setTitle }) {
  const [issue, setIssue] = useState(null);
  const location = useLocation();
  const id = location.search.split("=")[1]; //TODO ADD Error handling if query doesnt exist

  useEffect(() => {
    async function getIssueDetails() {
      const res = await issuesHandler.getById(id);
      setIssue(res.issue);
      setTitle(res.issue.title);
    }
    if (!issue) {
      getIssueDetails();
    }
  });

  return (
    issue && (
      <React.Fragment>
        <IssueInfoCard
          info={issue}
          editIssueUrl={isAdmin ? `/user/issue-edit?id=${id}` : null}
        />
        <Comments
          comments={issue.comments}
          assignee={issue.assignee ? issue.assignee.username : null}
        />
        <AddComment issueId={issue._id} setIssue={setIssue} />
      </React.Fragment>
    )
  );
}
