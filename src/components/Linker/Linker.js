import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import {handleComplete, handleError, setUrl} from "components/Linker/actions";

import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles, Typography} from "@material-ui/core";
import {getLink} from "modules/moongo";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const Linker = props => {
  const classes = useStyles();

  useEffect(() => {
    const asyncGetLink = async () => {
      const res = await getLink(props.match.params.word);
      if (res.data.success) {
        props.setUrl(res.data.url);
        setTimeout(() => {
          props.handleComplete(true);
          window.location.replace(res.data.url)
        }, 5000);
      } else {
        props.handleError(true)
      }
    };

    asyncGetLink();
  }, []);

  const renderRedirect = (
    <div className={classes.root}>
      <CircularProgress />
      <Typography>
        Redirecting to {props.url}
      </Typography>
    </div>
  );

  const renderRedirectToRoot = (
    <div>
      <Redirect to='/' />
      <CircularProgress />
      <Typography>
        Link does not exist. Redirecting to zal.la
      </Typography>
    </div>
  );

  return (
    <div className={classes.root}>
      {!props.isComplete && renderRedirect}
      {props.isError && renderRedirectToRoot}
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    isError: state.Linker.isError,
    isComplete: state.Linker.isComplete,
    url: state.Linker.url,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setUrl: url => dispatch(setUrl(url)),
    handleError: val => dispatch(handleError(val)),
    handleComplete: val => dispatch(handleComplete(val)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Linker));
