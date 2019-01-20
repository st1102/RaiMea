import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Tabs, Tab } from '@material-ui/core';
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
  tabs: {
    background: 'white',
  },
  tab: {
  },
};

class Restaurants extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event, value) {
    this.setState({ value })
  }

  componentDidMount() {

  }

  render() {
    const { classes } = this.props
    const { value } = this.state

    return (
      <div className={classes.div}>
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
};

export default withStyles(styles)(Restaurants);
