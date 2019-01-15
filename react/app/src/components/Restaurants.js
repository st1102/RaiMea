import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import RestList from './RestList';

const styles = {
  div: {
    height: 'calc(100% - 64px - 20px)', // appbar+margin分マイナス
    width: '80%',
    margin: '0 10% 0 10%',
    overflow: 'scroll',
  },
  innerDiv: {
    // height: '100%',
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
