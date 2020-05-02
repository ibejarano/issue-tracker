import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom'

import {issuesHandler} from '../handlers/issues';
import IssueInfoCard from './issue/cards/bug-info-card';
import IssueCommentCard from './issue/cards/bug-comment-card';
import IssueAddComment from './issue/add-comment';

export default function IssueDetails(props) {
  async function getIssueComments() {
    const res = await issuesHandler.getById(id);
    console.log('Received issue info', res);
    setIssue(res.issue);
    setIsAdmin(res.user.role === 0 ? true : false);
    if (res.issue.comments.length) {
      setCommentsCards(
        <IssueCommentCard
          comments={res.issue.comments}
          assignee={res.issue.assignee ? res.issue.assignee.username : null}
        />,
      );
    }
  }

  const [issue, setIssue] = useState(null);
  const [commentsCards, setCommentsCards] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation()
  const id = location.search.split('=')[1]; //TODO ADD Error handling if query doesnt exist

  const addNewComment = async function(text) {
    const params = {text};
    try {
      await issuesHandler.addComment(id, params);
      getIssueComments();
    } catch (err) {
      console.log('An error ocurred adding comment:', err.toString());
    }
  };

  useEffect(() => {
    async function getIssueDetails() {
      const res = await issuesHandler.getById(id);
      setIssue(res.issue);
      setIsAdmin(res.user.role === 0 ? true : false);
      if (res.issue.comments.length) {
        setCommentsCards(
          <IssueCommentCard
            comments={res.issue.comments}
            assignee={res.issue.assignee ? res.issue.assignee.username : null}
          />,
        );
      }
    }
    if(!issue){
    getIssueDetails();
    }
  });

  return (
    <div
      section={
        issue ? (
          <IssueInfoCard
            info={issue}
            editIssueUrl={isAdmin ? `/user/issue-edit?id=${id}` : null}
          />
        ) : (
          'Cargando...'
        )
      }
      isAdmin={isAdmin}>
      {commentsCards}
      <IssueAddComment addNewComment={addNewComment} />
    </div>
  );
}
