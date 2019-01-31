import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import {Card, CardContent, CardMedia, Typography, GridList, GridListTile, Hidden } from '@material-ui/core'
import { Room } from '@material-ui/icons'
import PropTypes from 'prop-types';
import axios from 'axios';

const styles = theme => ({
  card: {
    display: 'flex',
    margin: '1px 0 1px 0',
    padding: '10px 20px 10px 20px',
    [theme.breakpoints.down('sm')]: {
      padding: '5px',
    },
  },
  detail: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    [theme.breakpoints.down('xs')]: {
      width: '70%',
    },
  },
  restNameLink: {
    [theme.breakpoints.down('sm')]: {
    },
  },
  restName: {
    [theme.breakpoints.down('sm')]: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  },
  restAccess: {
    display: 'flex',
    margin: '10px 0 0 0',
    [theme.breakpoints.down('sm')]: {
      margin: '0',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  },
  accessIcon: {
    color: 'red',
  },
  imgList: {
    width: '50%',
    [theme.breakpoints.down('xs')]: {
      width: '30%',
    },
  },
  gridList: {
  }
  // img: {
  //   width: '160px',
  //   height: '100px',
  //   margin: '0 2px 0 0',
  // },
});

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
              className={classes.restNameLink}>
              <Hidden xsDown>
                <Typography variant='title' className={classes.restName}>
                  {this.props.restInfo.name}
                </Typography>
              </Hidden>
              <Hidden smUp>
                <Typography variant='body2' className={classes.restName}>
                  {this.props.restInfo.name}
                </Typography>
              </Hidden>
            </Link>
            <div className={classes.restAccess}>
              <Room className={classes.accessIcon}/>
              <Hidden xsDown>
                <Typography variant='subheading'>
                  {this.props.stationName}駅から徒歩{Math.round(this.props.restInfo.distance/80)}分
                </Typography>
              </Hidden>
              <Hidden smUp>
                <Typography variant='body1'>
                  {this.props.stationName}駅から徒歩{Math.round(this.props.restInfo.distance/80)}分
                </Typography>
              </Hidden>
            </div>
          </div>
          <Hidden xsDown>
            <div className={classes.imgList}>
              <GridList className={classes.gridList} cellHeight={100} cols={3}>
                {this.state.restPhotos.map((restPhoto) => (
                  <GridListTile key={restPhoto} className={classes.gridListTile}>
                    <img src={restPhoto}/>
                  </GridListTile>
                ))}
              </GridList>
            </div>
          </Hidden>
          <Hidden smUp>
            <div className={classes.imgList}>
              <GridList className={classes.gridList} cellHeight={50} cols={1}>
                <GridListTile key={this.state.restPhotos[1]} className={classes.gridListTile}>
                  <img src={this.state.restPhotos[1]}/>
                </GridListTile>
              </GridList>
            </div>
          </Hidden>
        </Card>
      </div>
    )
  }
}

RestInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RestInfo);
