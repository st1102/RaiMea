import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';
import localSearchKey from '../../key.js'

const styles = {
  route: {
    background: 'white',
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
    this.getRestInfo()
  }

  getRestInfo(){
    axios
    .get('http://0.0.0.0:3000/train/restaurants?lat=' + this.props.stationInfo.lat + '&lon=' + this.props.stationInfo.lon)
    .then((results) => {
      console.log(results)
      this.setState({
        restInfoList: results,
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
        {this.props.stationInfo.name}
      </div>
    )
  }
}

RestList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RestList);
