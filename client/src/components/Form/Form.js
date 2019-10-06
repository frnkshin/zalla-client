import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLink} from "@fortawesome/free-solid-svg-icons";
import {makeStyles} from "@material-ui/core";
import LinkBox from "components/LinkBox/LinkBox";
import CopyButton from "components/CopyButton";
import Timer from "components/Timer/Timer";

import {createLink} from "modules/moongo";
import {isValidUrl} from "modules/helpers";
import {setLabel, setError} from "components/LinkBox/actions";
import {setShortUrl, setStatus} from "components/Form/actions";
import {initialize} from "components/Timer/actions";

const useStyles = makeStyles(theme => ({
  button: {
    margin: '1vh',
    backgroundColor: "#5b6bc0",
    width: '20vh',
  },
  textField: {
    paddingBottom: '2vh',
  }
}));

const ShortenerForm = props => {
  const classes = useStyles();

  useEffect(() => {
    props.setLabel("LongUrlField", "url to shrink");
    props.setLabel("ShortUrlField", "custom word");
  }, []);

  const handleKeyDown = event => event.key === 'Enter' && handleSubmit();

  const handleSubmit = async () => {
    if (!isValidUrl(props.LongUrlField.text)) {
      props.setError("LongUrlField", true);
      props.setLabel("LongUrlField", "invalid url");
    } else {
      try {
        props.setStatus('loading');
        let res = await createLink(props.ShortUrlField.text, props.LongUrlField.text);
        if (res.data.success) {
          console.log(res.data);
          props.setShortUrl(`https://zal.la/${res.data.word}`);
          props.history.push(`/results/${res.data.word}`);
          props.setStatus('complete');
        }
      } catch {
        props.setError("ShortUrlField", true);
        props.setLabel("ShortUrlField", "word is already in use");
      }
    }
  };

  const renderInputForm = (
    <Box>
      <LinkBox autoFocus={true}
               className={classes.textField}
               error={props.ShortUrlField.error}
               namespace="ShortUrlField"
               label={props.ShortUrlField.label}
               placeholder="zal.la/{your_unique_word}"
               onKeyDown={handleKeyDown}/>
      &nbsp;
      &nbsp;
      <LinkBox className={classes.textField}
               error={props.LongUrlField.error}
               namespace="LongUrlField"
               label={props.LongUrlField.label}
               onKeyDown={handleKeyDown}/>
      &nbsp;
      &nbsp;
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        href={null}
        onClick={handleSubmit}>
        Go
      </Button>
    </Box>
  );

  const renderLoading = (
    <div>
      <CircularProgress />
    </div>
  );

  const renderResults = (
    <div>
      <FontAwesomeIcon icon={faLink}/>
      &nbsp;
      {props.shortUrl}
      &nbsp;
      <Timer />
      <CopyButton url={props.shortUrl} text="Copy to clipboard"/>
    </div>
  );

  return (
    <div>
      {props.status === 'initial' && renderInputForm}
      {props.status === 'loading' && renderLoading}
      {props.status === 'complete' && renderResults}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    LongUrlField: {
      label: state.LongUrlField.label,
      error: state.LongUrlField.error,
      text: state.LongUrlField.text,
    },
    ShortUrlField: {
      label: state.ShortUrlField.label,
      error: state.ShortUrlField.error,
      text: state.ShortUrlField.text,
    },
    status: state.ShortenerForm.status,
    shortUrl: state.ShortenerForm.shortUrl,
    redirect: state.ShortenerForm.redirect,
    redirectTo: state.ShortenerForm.redirectTo,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLabel: (namespace, label) => dispatch(setLabel(namespace, label)),
    setError: (namespace, isError) => dispatch(setError(namespace, isError)),
    setStatus: status => dispatch(setStatus(status)),
    setShortUrl: url => dispatch(setShortUrl(url)),
    initializeTimer: date => dispatch(initialize(date)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShortenerForm));
