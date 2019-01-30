import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Tabs, Tab } from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';
import localSearchKey from '../../key.js'
import RestInfo from './RestInfo';

const styles = {
  route: {
    // background: 'white',
    overflow: 'scroll',
  },
};

class RestList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      restInfoList: [],
    }
  }

  componentDidMount() {
    this.getRestList()
  }

  getRestList(){
    axios
    .get('http://0.0.0.0:3000/train/restaurants?lat=' + this.props.stationInfo.lat + '&lon=' + this.props.stationInfo.lon)
    .then((results) => {
      console.log(results)
      console.log(this.props.stationInfo)
      this.setState({
        restInfoList: results.data.businesses,
      })
      console.log(this.state)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.route}>
        {this.state.restInfoList.map((restInfo) => (
          <RestInfo key={restInfo.id} restInfo={restInfo} stationName={this.props.stationInfo.name}></RestInfo>
        ))}
      </div>
    )
  }
}

RestList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RestList);
