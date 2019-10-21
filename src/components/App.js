import React from 'react';
import {connect} from 'react-redux';

import MainBar from "components/MainBar";
import UrlBox from "components/Form/Form";
import {Redirect} from "react-router";
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
    width: '100%',
    transform: `translate(-50%, -50%)`
  }
}));

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {<Redirect to='/'/>}
      <MainBar/>
      <div className={classes.content}>
        <UrlBox/>
      </div>
    </div>
  );
};

export default connect()(App);
