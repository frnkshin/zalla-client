import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {Card, CardActions, CardContent, makeStyles, Typography} from "@material-ui/core";
import Timer from "components/Timer/Timer";
import CopyButton from "components/CopyButton";
import {getLink} from "modules/moongo";
import {changeStatus, changeUrl} from "controller/Result/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import {withRouter} from "react-router";
import {initialize} from "components/Timer/actions";

const useStyles = makeStyles(theme => ({
  card: {
    width: '45em'
  },
}));

const Result = props => {
  const [shortUrl, ] = useState(`https://zal.la/${props.word}`)
  const classes = useStyles();

  useEffect(() => {
    const asyncGetLink = async () => {
      const res = await getLink(props.word);
      if (res.data.success) {
        props.changeUrl(res.data.url);
        props.initializeTimer(res.data.updatedAt);
        props.changeStatus('loaded-success');
      } else {
        props.changeStatus('loaded-expired');
        props.initializeTimer(res.data.updatedAt);
      }
    };
    asyncGetLink();
  }, [props.word]);

  const renderLoading = (
    <div>
      <CircularProgress/>
    </div>
  );

  const renderResults = (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          URL shortened
        </Typography>
        <div>
          <Typography variant="h5" component="h2">
            {shortUrl}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {props.url}
          </Typography>
        </div>
        <Timer/>
      </CardContent>
      <CardActions>
        <CopyButton url={shortUrl} text="Copy"/>
      </CardActions>
    </Card>
  );

  const renderExpired = (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Short URL
        </Typography>
        <div>
          <Typography variant="h5" component="h2">
            https://zal.la/{props.word}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Thie URL does not exist
          </Typography>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div id="result-root">
      {props.status === 'loading' && renderLoading}
      {props.status === 'loaded-success' && renderResults}
      {props.status === 'loaded-expired' && renderExpired}
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    status: state.Result.status,
    url: state.Result.url,
    updatedAt: state.Result.updatedAt,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeStatus: (status) => dispatch(changeStatus(status)),
    changeUrl: (url) => dispatch(changeUrl(url)),
    initializeTimer: (date) => dispatch(initialize(date)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Result));
