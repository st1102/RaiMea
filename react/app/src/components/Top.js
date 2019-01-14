import React from 'react'
// import { BrowserRouter, Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router';
// import styles from '../assets/top.css'
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import Select from 'react-select';
import { TextField, Button, Paper, MenuItem, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import stationKey from '../../key.js'

const styles = {
  div: {
    height: 'calc(100% - 64px - 40px)', // ヘッダーとpadding分マイナス
    width: 'calc(100% - 20px)',
    padding: '10px',
    overflow: 'hidden',
  },
  pageDesc: {
    display: 'flex',
    height: '30%',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textFields: {
    display: 'flex',
    width: '60%',
    height: '30%',
    margin: '0 19% 0 19%',
    padding: '1%',
    background: '#F57F17cc',
    flexWrap: 'wrap',
    borderRadius: '4px',
  },
  tFieldDesc: {
    display: 'flex',
    flexBasis: '100%',
    margin: '0 10% 0 10%',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  railField: {
    position: 'relative',
    display: 'flex',
    flexBasis: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 2% 0 2%',
  },
  railDownshift: {
    background: '#fff',
    borderRadius: '4px',
  },
  railPaper: {
    position: 'absolute',
    width: '76%',
    marginTop: '4px',
    zIndex: 1,
  },
  depaDest: {
    display: 'flex',
    flexBasis: '40%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 2% 0 2%',
  },
  depa: {
    width: '80%',
    margin: '5% 5% 5% 5%',
  },
  dest: {
    width: '80%',
    margin: '5% 5% 5% 5%',
  },
  submitButton: {
    height: '30%',
    margin: 'auto 0 0 auto',
    background: '#fff',
  }
}

const inputProps = {
  step: 300,
}

// let items = [
//   {Name: 'aaa'},
//   {Name: 'bbb'},
//   {Name: 'ccc'},
// ]

// const items = [
//       { value: 'nfb', label: 'NetFront Browser' },
//       { value: 'nfnx', label: 'NetFront NX' },
//       { value: 'nfbe', label: 'NetFront BE' },
//       ];

class Top extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lineName: '',
      railSuggestions: [
        {Name: 'aaa'},
        {Name: 'bbb'},
        {Name: 'ccc'},
      ],
      // depaSuggestions: [
      //   { value: 'nfb', label: 'NetFront Browser' },
      //   { value: 'nfnx', label: 'NetFront NX' },
      //   { value: 'nfbe', label: 'NetFront BE' },
      // ],
      // destSuggestions: [
      //   { value: 'nfb', label: 'NetFront Browser' },
      //   { value: 'nfnx', label: 'NetFront NX' },
      //   { value: 'nfbe', label: 'NetFront BE' },
      // ],
      stationInfo: [],
      stations: [],
      depa: '',
      dest: '',
    }
    this.showRestaurants = this.showRestaurants.bind(this)
    this.showLineSuggest = this.showLineSuggest.bind(this)
    this.getStations = this.getStations.bind(this)
    this.setDepa = this.setDepa.bind(this)
    this.setDest = this.setDest.bind(this)
  }

  showRestaurants(){
    let routeStationsInfo = this.state.stationInfo.filter((item, index) => {
      return (index >= this.state.stations.indexOf(this.state.depa) && index <= this.state.stations.indexOf(this.state.dest))
    })
    this.props.history.push({
      pathname: '/restaurants',
      state: {
        routeStationsInfo: routeStationsInfo,
      },
    })
  }

  showLineSuggest(event){
    // console.log(event.target.name, event.target.value)
    axios
    .get('https://api.ekispert.jp/v1/json/operationLine?key=' + stationKey + '&name=ＪＲ' + event.target.value
    )
    .then((results) => {
      // console.log(results)
      if(results.data.ResultSet.Line){
        // items = results.data.ResultSet.Line
        this.setState({
          railSuggestions: results.data.ResultSet.Line,
        })
      } else {
      }
      // console.log(this.state)
    })
    .catch((error) => {
      console.log(error)
    })
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  getStations(event){
    this.state.lineName = event.target.value
    // this.setState({
    //   [event.target.name]: event.target.value,
    // })
    axios
    .get('http://0.0.0.0:3000/train?line=' + this.state.lineName)
    .then((results) => {
      // console.log(results.data.replace("if(typeof(xml)=='undefined') xml = {};", "").replace('xml.data = {"line_cd":11332,"line_name":"JR京浜東北線","line_lon":139.6425120970631,"line_lat":35.63929555924292,"line_zoom":10,"station_l":[', '').replace("]}", "").replace("if(typeof(xml.onload)=='function') xml.onload(xml.data);", ""))
      // console.log(results.data.split('"station_name":"'))
      let sInfo = []
      let sName = []
      let i = 0
      for (let station of results.data.split('"station_name":"')) {
        if (i != 0) {
          // console.log(station)
          let splitStation = station.split('"')
          // console.log(splitStation)
          sInfo.push({ name: splitStation[0], lon: splitStation[3].replace(':', '').replace(',', ''), lat: splitStation[5].replace(':', '').replace('},{', '') })
          sName.push({value: splitStation[0], label: splitStation[0]})
        }
        i += 1
      }
      // console.log(sInfo)
      this.setState({
        stationInfo: sInfo,
        stations: sName
      })
      // console.log(this.state)
    })
    .catch((error) => {
     console.log(error)
    })
    // console.log(this.state)
  }

  setDepa(value) {
    this.setState({
      depa: value,
    })
  }

  setDest(value) {
    this.setState({
      dest: value,
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.div}>
        <Typography　className={classes.pageDesc} variant="headline">
          電車経路沿線のラーメン屋を一括検索！！
        </Typography>
        <div className={classes.textFields}>
          <Typography className={classes.tFieldDesc} variant="sunheading">
            路線名から出発駅と到着駅を選択し検索！！
          </Typography>
          <div className={classes.railField}>
            <Downshift
              id="rail-downshift"
              itemToString={item => (item ? item.Name : '')}
            >
              {({
                getInputProps,
                getItemProps,
                getMenuProps,
                highlightedIndex,
                inputValue,
                isOpen,
                selectedItem,
              }) => (
                <div>
                    <TextField
                      id="id"
                      className={classes.railDownshift}
                      variant="outlined"
                      label="路線"
                      InputProps={getInputProps({
                        placeholder: 'Search a country (start with a)',
                        onChange: this.showLineSuggest,
                        onBlur: this.getStations,
                      })}
                      name="lineName"
                      value={this.state.lineName}
                    />
                  <div {...getMenuProps()}>
                    {isOpen && inputValue.length !== 0　? (
                        (this.state.railSuggestions.length > 1) ? (
                          <Paper
                            square
                            className={classes.railPaper}
                          >
                            {this.state.railSuggestions
                            .filter(suggestion => !inputValue || suggestion.Name.includes(inputValue))
                            .map((suggestion, index) => (
                              <MenuItem
                                {...getItemProps({
                                  key: suggestion.Name,
                                  index,
                                  item: suggestion,
                                })}
                                selected={highlightedIndex === index}
                                component="div"
                                style={{
                                  fontWeight: selectedItem === suggestion ? 500 : 400,
                                }}
                              >
                                {suggestion.Name}
                              </MenuItem>
                            ))}
                          </Paper>)
                        : (
                          <Paper square>
                            {(this.state.railSuggestions === !inputValue || this.state.railSuggestions.Name.includes(inputValue)) ?
                              (<MenuItem
                                {...getItemProps({
                                  key: this.state.railSuggestions.Name,
                                  item: this.state.railSuggestions,
                                })}
                                selected={selectedItem === this.state.railSuggestions}
                                component="div"
                                style={{
                                  fontWeight: selectedItem === this.state.railSuggestions ? 500 : 400,
                                }}
                              >
                                {this.state.railSuggestions.Name}
                              </MenuItem>) : null}
                          </Paper>)
                    ) : null}
                  </div>
                </div>
              )}
            </Downshift>
          </div>
          <div className={classes.depaDest}>
            <Select
              className={classes.depa}
              value={this.state.depa}
              options={this.state.stations}
              placeholder="出発駅"
              onChange={this.setDepa}
            />
            <Select
              className={classes.dest}
              value={this.state.dest}
              options={this.state.stations}
              placeholder="到着駅"
              onChange={this.setDest}
            />
          </div>
          <Button
            className={classes.submitButton}
            size="medium"
            variant="outlined"
            color="default"
            onClick={this.showRestaurants}>
            検索
          </Button>
        </div>
      </div>
    )
  }
}

Top.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  // railSuggestion: PropTypes.shape({ Name: PropTypes.string }).isRequired,
}

export default withRouter(withStyles(styles)(Top));
