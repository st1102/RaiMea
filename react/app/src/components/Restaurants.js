import React from 'react'
// import { BrowserRouter, Route, Link } from 'react-router-dom'
// import styles from '../assets/restaurants.css'
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

class Restaurants extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { classes } = this.props
    const routeStationInfo = this.props.location.state.routeStationsInfo
    console.log(routeStationInfo)

    return (
      <div className={classes.div}>
        <div className={classes.innerDiv}>
          Restaurants
        </div>
      </div>
    )
  }
}

Restaurants.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Restaurants);
