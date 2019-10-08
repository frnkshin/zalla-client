import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {useInterval} from "hooks/customHooks";
import {initialize, tick} from "components/Timer/actions";

import {Typography} from "@material-ui/core";

const Timer = (props) => {
  const [minutes, setMinutes] = useState('--');
  const [seconds, setSeconds] = useState('--');

  useInterval(() => {
    props.tick(props.secondsRemaining);
    let {minutes, seconds} = secondsToTime(props.secondsRemaining);
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    setMinutes(minutes);
    setSeconds(seconds);
  }, 1000);

  const secondsToTime = (seconds) => {
    return {minutes: Math.floor(seconds / 60), seconds: seconds % 60}
  };

  const renderTimer = (
    <Typography>
      {minutes}:{seconds}
    </Typography>
  );

  return (
    <div>
      {renderTimer}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    secondsRemaining: state.Timer.secondsRemaining,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    tick: (seconds) => dispatch(tick(seconds)),
    initialize: (date) => dispatch(initialize(date)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Timer));

