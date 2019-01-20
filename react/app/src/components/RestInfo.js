import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import {Card, CardContent, CardMedia, Typography} from '@material-ui/core'
import { Room } from '@material-ui/icons'
import PropTypes from 'prop-types';
import axios from 'axios';

const styles = {
  card: {
    display: 'flex',
    margin: '1px 0 1px 0',
    padding: '10px 20px 10px 20px',
  },
  detail: {
    display: 'flex',
    flexDirection: 'column',
  },
  restName: {
    textDecoration: 'none',
  },
  restAccess: {
    display: 'flex',
    margin: '10px 0 0 0',
  },
  accessIcon: {
    color: 'red',
  },
  imgList: {
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto 0 auto auto',
  },
  img: {
    width: '160px',
    height: '100px',
    margin: '0 2px 0 0',
  },
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
      // console.log(results)
      this.setState({
        restDetail: results.data,
        restPhotos: results.data.photos,
        // restHours: results.data.hours[0].is_open_now,
      })
      // console.log(this.state)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <Card　className={classes.card}>
          <div className={classes.detail}>
            <Link
              to={{
                pathname: '/restaurant',
                state: {
                  restInfo: this.props.restInfo,
                  restDetail: this.state.restDetail,
                  stationName: this.props.stationName,
                },
              }}
              className={classes.restName}>
              <Typography variant='title'>
                {this.props.restInfo.name}
              </Typography>
            </Link>
            <div className={classes.restAccess}>
              <Room className={classes.accessIcon}/>
              <Typography variant='subheading'>
                {this.props.stationName}駅から徒歩{Math.round(this.props.restInfo.distance/80)}分
              </Typography>
            </div>
          </div>
          <div className={classes.imgList}>
            {this.state.restPhotos.map((restPhoto) => (
              <img className={classes.img} key={restPhoto} src={restPhoto}/>
            ))}
          </div>
        </Card>
      </div>
    )
  }
}

RestInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RestInfo);
