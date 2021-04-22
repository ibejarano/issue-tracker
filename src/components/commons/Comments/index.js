import React from "react";

import { getIsoDate } from "../../../helpers/formatDate";
import "typeface-roboto";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import IssueInfoCard from "../IssueInfoCard";

const useStyles = makeStyles({
  card: {
    marginTop: "10px",
  },
  title: {
    fontSize: 14,
  },
  headerContainer: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    borderBottom: "1px solid grey",
    marginBottom: "16px"
  },
});

function isCommentAuthorAssignee(comment, assignee) {
  if (!assignee) {
    return false;
  } else if (comment.author === assignee.username) {
    return true;
  } else {
    return false;
  }
}

export default function CommentssCard({ comments, assignee }) {
  const classes = useStyles();
  const ListOfCommentCards = comments.map((comment) => {
    return (
      <Card className={classes.card} key={comment._id}>
        <CardContent>
          {isCommentAuthorAssignee(comment, assignee) && (
            <Chip color="primary" label="Asignee" />
          )}
          <div className={classes.headerContainer}>
            <Typography color="textPrimary" variant="h6">
              {comment.author}
            </Typography>
            <Typography color="textSecondary">
              {getIsoDate(comment.date)}
            </Typography>
          </div>
          <Typography component="p">{comment.text}</Typography>
          {comment.updateStatus && (
            <IssueInfoCard info={comment.updateStatus} />
          )}
        </CardContent>
      </Card>
    );
  });

  return <React.Fragment>{ListOfCommentCards}</React.Fragment>;
}
