import React from 'react'
// import { BrowserRouter, Route, Link } from 'react-router-dom'
// import styles from '../assets/top.css'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {
  div: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    padding: '10px',
    backgroundImage: 'url(../src/assets/image/top_background.jpg)',
    backgroundSize: 'cover',
    zIndex: -1,
    overflow: 'hidden',
  },
  innerDiv: {
    marginTop: 'calc(64px + 10px)',
  },
};

const Top = (props) => {
  const { classes } = props;
  return (
    <div className={classes.div}>
      <div className={classes.innerDiv}>
        Top
      </div>
    </div>
  )
}

Top.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Top);
