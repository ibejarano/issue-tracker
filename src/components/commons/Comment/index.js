import React from "react";

import { getIsoDate } from "../../../helpers/formatDate";
import "typeface-roboto";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import ChipsArray from "./bug-info-card";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    marginTop: "10px",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: "40px",
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

export default function CommentsCard({ comments, assignee }) {
  const classes = useStyles();
  const ListOfCommentCards = comments.map((comment) => {
    return (
      <Card className={classes.card} key={comment._id}>
        <CardContent>
          {isCommentAuthorAssignee(comment, assignee) && (
            <Chip color="primary" label="Asignee" />
          )}
          <Typography component="subtitle1" color="textPrimary">
            {comment.author} - <span />
          </Typography>
          <Typography
            className={classes.pos}
            color="textSecondary"
            component="body1"
          >
            {getIsoDate(comment.date)}
          </Typography>
          <Typography component="p">{comment.text}</Typography>
          {comment.updateStatus && <ChipsArray info={comment.updateStatus} />}
        </CardContent>
      </Card>
    );
  });

  return <div>{ListOfCommentCards}</div>;
}
