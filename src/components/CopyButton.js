import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    margin: '1vh',
    backgroundColor: '#5b6bc0',
    width: '20vh'
  }
}));

const CopyButton = props => {
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('Copy to clipboard');
  const classes = useStyles();

  const saveToClipboard = () => {
    let element = document.createElement("input");
    document.body.appendChild(element);
    element.setAttribute('value', props.url);
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);
    setIsComplete(true);
    setMessage("Copied");
  };

  return (
    <Button className={classes.root}
            url={props.url}
            variant="contained"
            color="primary"
            disabled={document.queryCommandEnabled('copy')}
            onClick={!isComplete ? saveToClipboard : undefined}
            href={null}>
      {message}
    </Button>
  );
};

export default CopyButton
