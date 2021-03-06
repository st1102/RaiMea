import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { Tabs, Tab, Button, Hidden } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';
import PropTypes from 'prop-types';
import RestList from './RestList';

const styles = theme => ({
  div: {
    height: 'calc(100% - 10% - 20px)', // appbar+margin分マイナス
    width: '80%',
    margin: '0 10% 0 10%',
    overflow: 'scroll',
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)',
      margin: '10px',
    },
  },
  backBtn: {
    position: 'absolute',
    top: 'calc(10% + 20px)', // appbar+margin分マイナス
    left: '10px',
    height: '48px',
  },
  backBtnFab: {
    position: 'absolute',
    bottom: theme.spacing.unit,
    left: theme.spacing.unit,
    background: '#f50057cc',
  },
  backIcon: {
    marginLeft: '8px',
  },
  innerDiv: {
    // height: '100%',
  },
  tabs: {
    background: 'white',
  },
  tab: {
  },
});

class Restaurants extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
    }
    this.handleChange = this.handleChange.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  goBack(){
    this.props.history.goBack()
  }

  handleChange(event, value) {
    this.setState({ value })
  }

  render() {
    const { classes } = this.props
    const { value } = this.state

    console.log(this.props.location.state)

    return (
      <div className={classes.div}>
        <Hidden smDown>
          <Button
            className={classes.backBtn}
            color="secondary"
            variant="contained"
            onClick={this.goBack}
          >
            <ArrowBackIos className={classes.backIcon} />
          </Button>
        </Hidden>
        <Hidden mdUp>
          <Button
            className={classes.backBtnFab}
            color="secondary"
            variant="fab"
            onClick={this.goBack}
          >
            <ArrowBackIos className={classes.backIcon} />
          </Button>
        </Hidden>
        <div className={classes.innerDiv}>
          <Tabs
            className={classes.tabs}
            value={value}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            scrollable
            scrollButtons="auto"
          >
            {this.props.location.state.routeStationsInfo.map((stationInfo) => (
              <Tab key={stationInfo.name} label={stationInfo.name} className={classes.tab}/>
            ))}
          </Tabs>
          {this.props.location.state.routeStationsInfo.map((stationInfo) => (
            <div key={stationInfo.name}>
              {value === this.props.location.state.routeStationsInfo.indexOf(stationInfo) && <RestList key={stationInfo.name} stationInfo={stationInfo}></RestList>}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

Restaurants.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Restaurants));
