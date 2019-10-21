import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core";

import LinkBox from "components/LinkBox/LinkBox";
import {setLabel, setError} from "components/LinkBox/actions";
import {setShortUrl, setLongUrl, setStatus} from "components/Form/actions";
import {initialize} from "components/Timer/actions";

import {createLink} from "modules/moongo";
import {isValidUrl} from "modules/helpers";


const useStyles = makeStyles(theme => ({
  button: {
    margin: '1vh',
    backgroundColor: "#5b6bc0",
    width: '20vh',
  },
  card: {
    width: '60em'
  },
  title: {
    fontSize: 14,
    left: 0,
  },
  pos: {
    marginBottom: 12,
  },
  textField: {
    paddingBottom: '2vh',
    marginLeft: '20px',
    marginRight: '20px',
  },
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
          props.setShortUrl(`https://zal.la/${res.data._doc.word}`);
          props.setLongUrl(res.data._doc.url);
          props.initializeTimer(res.data._doc.updatedAt);
          props.history.push(`/results/${res.data._doc.word}`);
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
      <LinkBox className={classes.textField}
               error={props.LongUrlField.error}
               namespace="LongUrlField"
               label={props.LongUrlField.label}
               onKeyDown={handleKeyDown}/>
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

  return (
    <div>
      {renderInputForm}
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
    longUrl: state.ShortenerForm.longUrl,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLabel: (namespace, label) => dispatch(setLabel(namespace, label)),
    setError: (namespace, isError) => dispatch(setError(namespace, isError)),
    setStatus: status => dispatch(setStatus(status)),
    setShortUrl: url => dispatch(setShortUrl(url)),
    setLongUrl: url => dispatch(setLongUrl(url)),
    initializeTimer: (date) => dispatch(initialize(date)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShortenerForm));
