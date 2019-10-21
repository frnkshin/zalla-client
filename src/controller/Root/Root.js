import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {makeStyles} from "@material-ui/core";

import MainBar from "components/MainBar";
import ShortenerForm from "components/Form/Form";
import Result from "controller/Result/Result";

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

  useEffect(() => {
    console.log(props.route);
  }, []);

  return (
    <div className={classes.root}>
      <MainBar/>
      <div className={classes.content}>
        {props.route === "/" && <ShortenerForm />}
        {props.route === "/results" && <Result word={props.match.params.word}/>}
      </div>
    </div>
  );
};

export default withRouter(connect()(Root));
