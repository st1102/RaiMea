import React from 'react'
// import { BrowserRouter, Route, Link } from 'react-router-dom'
// import styles from '../assets/restaurants.css'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import RestList from './RestList';

const styles = {
  div: {
    height: 'calc(100% - 64px - 40px)', // ヘッダーとpadding分マイナス
    width: 'calc(100% - 20px)',
    padding: '10px',
    overflow: 'hidden',
  },
  innerDiv: {
    // overflow: 'scroll',
  },
};

class Restaurants extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.div}>
        <div className={classes.innerDiv}>
          {this.props.location.state.routeStationsInfo.map((stationInfo) => (
            <RestList key={stationInfo.name} stationInfo={stationInfo}></RestList>
          ))}
        </div>
      </div>
    )
  }
}

Restaurants.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Restaurants);
