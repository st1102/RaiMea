import React from 'react'
// import { BrowserRouter, Route, Link } from 'react-router-dom'
// import styles from '../assets/restaurant.css'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {
  div: {
    position: 'absolute',
    top: 0,
    height: 'calc(100% - 10px - 10px)',
    width: '100%',
    padding: '10px',
    // backgroundImage: 'url(../src/assets/image/top_background.jpg)',
    // backgroundSize: 'cover',
    // zIndex: -1,
    overflow: 'hidden',
  },
  innerDiv: {
    marginTop: 'calc(64px + 10px)',
  },
};

const Restaurant = (props) => {
  const { classes } = props;
  return (
    <div className={classes.div}>
      <div className={classes.innerDiv}>
        Restaurant
      </div>
    </div>
  )
}

Restaurant.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Restaurant);
