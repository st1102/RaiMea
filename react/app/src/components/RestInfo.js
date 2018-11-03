import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';

const styles = {
  img: {
    width: '160px',
    height: '100px',
  }
};

class RestInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      restDetail: '',
      restPhotos: [],
    }
  }

  componentDidMount() {
    this.getRestPhoto()
  }

  getRestPhoto(){
    axios
    .get('http://0.0.0.0:3000/train/detail?id=' + this.props.restInfo.id)
    .then((results) => {
      console.log(results)
      this.setState({
        restDetail: results.data,
        restPhotos: results.data.photos,
        restHours: results.data.hours[0].is_open_now,
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
      <div>
        <Link to={{
            pathname: '/restaurant',
            state: {
              restInfo: this.props.restInfo,
              restDetail: this.state.restDetail,
              stationName: this.props.stationName,
            },
          }} >{this.props.restInfo.name}</Link>
        <div>{this.props.stationName}駅から徒歩{Math.round(this.props.restInfo.distance/80)}分</div>
        <div>現在{this.state.restHours ? <span>営業中</span> : <span>閉店中</span>}</div>
        <div>
          {this.state.restPhotos.map((restPhoto) => (
            <img className={classes.img} key={restPhoto} src={restPhoto}/>
          ))}
        </div>
      </div>
    )
  }
}

RestInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RestInfo);
