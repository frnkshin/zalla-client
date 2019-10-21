import React from 'react';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {setError, setLabel, setText} from "components/LinkBox/actions";

const LinkBox = props => {
  const handleChange = event => props.setText(event.target.value);

  return (
    <TextField
      autoFocus={props.autoFocus}
      className={props.className}
      label={props.label}
      onChange={handleChange}
      onKeyDown={props.onKeyDown}
      placeholder={props.placeholder}
      error={props.error}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  let namespacedState = state[ownProps.namespace];
  return {
    text: namespacedState.text,
    label: namespacedState.label,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setLabel: label => dispatch(setLabel(ownProps.namespace, label)),
    setText: text => dispatch(setText(ownProps.namespace, text)),
    setError: isError => dispatch(setError(ownProps.namespace, isError)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LinkBox));
