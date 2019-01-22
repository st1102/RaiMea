import React from 'react'
import ReactDOM from 'react-dom'
// import { BrowserRouter, Route, Link } from 'react-router-dom'
// import styles from '../assets/restaurant.css'
import { withRouter } from 'react-router'
import { Room, StarRate, RateReview, Phone, Map, ArrowBackIos } from '@material-ui/icons'
import { Typography, GridList, GridListTile, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  div: {
    width: '80%',
    height: 'calc(100% - 64px - 20px)',
    margin: '0 10% 0 10%',
    background: 'white',
    overflow: 'scroll',
  },
  backBtn: {
    position: 'absolute',
    top: 'calc(64px + 20px)', // appbar+margin分マイナス
    left: 'calc(5% - 4px)',
    height: '48px',
  },
  backIcon: {
    marginLeft: '8px',
  },
  flexDiv: {
    display: 'flex',
    height: '50%',
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit*4,
  },
  detailDiv: {
    flexBasis: '50%',
  },
  name: {
    padding: theme.spacing.unit,
  },
  restAccess: {
    display: 'flex',
    padding: theme.spacing.unit,
  },
  accessIcon: {
    color: 'red',
  },
  ratingReview: {
    display: 'flex',
  },
  rating: {
    display: 'flex',
    padding: theme.spacing.unit,
  },
  ratingIcon: {
    color: 'orange',
  },
  review: {
    display: 'flex',
    padding: theme.spacing.unit,
  },
  reveiwIcon: {
    color: 'green',
  },
  yelp: {
    padding: theme.spacing.unit,
  },
  yelpUrl: {
    color: 'black',
    // textDecoration: 'none',
  },
  search: {
    padding: theme.spacing.unit,
  },
  searchUrl: {
    color: 'black',
    // textDecoration: 'none',
  },
  phoneAddress: {
    marginTop: theme.spacing.unit*3,
  },
  phone: {
    display: 'flex',
    padding: theme.spacing.unit,
  },
  address: {
    display: 'flex',
    padding: theme.spacing.unit,
  },
  imgDiv: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '50%',
    padding: theme.spacing.unit,
  },
  // img: {
  //   width: '80%',
  //   height: '30%',
  //   margin: '2px 10% 0 10%',
  // },
  map: {
    width: '90%',
    height: '500px',
    margin: '0 5% 10px 5%',
  },
});

class Restaurant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.goBack = this.goBack.bind(this)
  }

  goBack(){
    this.props.history.goBack()
  }

  componentDidMount() {
    console.log(this.props.location.state)

    const centerLatLng = {lat: this.props.location.state.restInfo.coordinates.latitude, lng: this.props.location.state.restInfo.coordinates.longitude}
    const map = new google.maps.Map(ReactDOM.findDOMNode(this.refs["map"]), {
      center: centerLatLng,
      zoom: 15,
    })
    const restMarker = new google.maps.Marker({
      position: centerLatLng,
      map: map,
    })
  }

  render(){
    const { classes } = this.props;

    return (
      <div className={classes.div}>
        <Button
          className={classes.backBtn}
          variant="contained"
          color="secondary"
          onClick={this.goBack}
        >
          <ArrowBackIos className={classes.backIcon} />
        </Button>
        <div className={classes.flexDiv}>
          <div className={classes.detailDiv}>
            <Typography variant='display1' className={classes.name}>
              {this.props.location.state.restInfo.name}
            </Typography>
            <div className={classes.restAccess}>
              <Room className={classes.accessIcon}/>
              <Typography variant='subheading'>
                {this.props.location.state.stationName}駅から徒歩{Math.round(this.props.location.state.restInfo.distance/80)}分
              </Typography>
            </div>
            <div className={classes.ratingReview}>
              <div className={classes.rating}>
                <StarRate className={classes.ratingIcon}/>
                <Typography variant='subheading'>
                  {this.props.location.state.restDetail.rating}
                </Typography>
              </div>
              <div className={classes.review}>
                <RateReview className={classes.reviewIcon}/>
                <Typography variant='subheading'>
                  {this.props.location.state.restDetail.review_count}件
                </Typography>
              </div>
            </div>
            <div className={classes.yelp}>
              <Typography variant='subheading'>
                <a className={classes.yelpUrl} href={this.props.location.state.restDetail.url} target='_blank'>Yelpで詳細,予約</a>
              </Typography>
            </div>
            <div className={classes.search}>
              <Typography variant='subheading'>
                <a className={classes.searchUrl} href={'http://www.google.co.jp/search?q=' + this.props.location.state.restInfo.name} target='_blank'>{this.props.location.state.restInfo.name}についてもっと調べる</a>
              </Typography>
            </div>
            <div className={classes.phoneAddress}>
              <div className={classes.phone}>
                <Phone className={classes.phoneIcon}/>
                <Typography variant='subheading'>
                  {this.props.location.state.restInfo.display_phone}
                </Typography>
              </div>
              <div className={classes.address}>
                <Map className={classes.mapIcon}/>
                <Typography variant='subheading'>
                  {this.props.location.state.restInfo.location.display_address[0] + this.props.location.state.restInfo.location.display_address[1]}
                </Typography>
              </div>
            </div>
          </div>
          <div className={classes.imgDiv}>
            <GridList cellHeight={160}>
              {this.props.location.state.restDetail.photos.map((restPhoto) => (
                <GridListTile key={restPhoto}>
                  <img src={restPhoto}/>
                </GridListTile>
              ))}
            </GridList>
          </div>
        </div>
        <div ref="map" id="map" className={classes.map}/>
      </div>
    )
  }
}

Restaurant.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Restaurant));
