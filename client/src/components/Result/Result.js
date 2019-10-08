import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {Card, CardActions, CardContent, Typography} from "@material-ui/core";
import Timer from "../Timer/Timer";
import CopyButton from "../CopyButton";
import {getLink} from "modules/moongo";

const Result = props => {
  useEffect(() => {
    const fetchLink = async () => {
      console.log(props);
      let res = await getLink(props.match.params.word);
      console.log(res);
    };

    fetchLink();
  }, []);

  return (
    <div>

    </div>
    /*
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

     */
  )
};

export default Result;
