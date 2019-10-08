import React from 'react';
import {connect} from 'react-redux';

import MainBar from "components/MainBar";
import ShortenerForm from "components/Form/Form";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'center',
    textAlign: 'center',
    margin: 0
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`
  }
}));

const Root = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MainBar/>
      <div className={classes.content}>
        <ShortenerForm/>
      </div>
    </div>
  );
};

export default connect()(Root);
