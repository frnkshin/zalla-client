import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {Card, CardActions, CardContent, makeStyles, Typography} from "@material-ui/core";
import Timer from "../Timer/Timer";
import CopyButton from "../CopyButton";
import {getLink} from "modules/moongo";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  card: {
    width: '60em'
  },
}));

const Result = props => {
  const classes = useStyles();

  const renderLoading = (
    <div>
      <CircularProgress/>
    </div>
  );

  const renderResults = (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Short URL
        </Typography>
        <Typography variant="h5" component="h2">
          {props.shortUrl}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.longUrl}
        </Typography>
        <Timer/>
      </CardContent>
      <CardActions>
        <CopyButton url={props.shortUrl} text="Copy"/>
      </CardActions>
    </Card>
  );

  return (
    <div>
    </div>
  )
};

export default Result;
