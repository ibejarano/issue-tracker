import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { issuesHandler } from "../handlers/issues";
import IssueInfoCard from "../components/issue/cards/bug-info-card";
import IssueCommentCard from "../components/issue/cards/bug-comment-card";
import AddComment from "../components/commons/AddComment";

export default function IssueDetails({ isAdmin }) {
  const [issue, setIssue] = useState(null);
  const location = useLocation();
  const id = location.search.split("=")[1]; //TODO ADD Error handling if query doesnt exist

  useEffect(() => {
    async function getIssueDetails() {
      const res = await issuesHandler.getById(id);
      setIssue(res.issue);
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
        <IssueCommentCard
          comments={issue.comments}
          assignee={issue.assignee ? issue.assignee.username : null}
        />
        <AddComment issueId={issue._id} />
      </React.Fragment>
    )
  );
}
