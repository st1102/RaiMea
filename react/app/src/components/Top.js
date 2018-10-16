import React from 'react'
// import { BrowserRouter, Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router';
// import styles from '../assets/top.css'
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import Select from 'react-select';
import { TextField, Button, Paper, MenuItem } from '@material-ui/core';
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
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textFields: {
    display: 'flex',
    width: '60%',
    height: '30%',
    margin: '17% 19% 17% 19%',
    padding: '1%',
    background: '#FFE0B2FC',
    flexWrap: 'wrap',
    borderRadius: '10px',
  },
  tFieldDesc: {
    display: 'flex',
    flexBasis: '80%',
    margin: '0 10% 0 10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textField: {
    flexBasis: '30%',
    margin: '0 10% 0 10%',
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
      depaSuggestions: [
        { value: 'nfb', label: 'NetFront Browser' },
        { value: 'nfnx', label: 'NetFront NX' },
        { value: 'nfbe', label: 'NetFront BE' },
      ],
      destSuggestions: [
        { value: 'nfb', label: 'NetFront Browser' },
        { value: 'nfnx', label: 'NetFront NX' },
        { value: 'nfbe', label: 'NetFront BE' },
      ],
      depa: '',
      dest: '',
    }
    this.showRestaurants = this.showRestaurants.bind(this)
    this.showLineSuggest = this.showLineSuggest.bind(this)
    this.getDepaDest = this.getDepaDest.bind(this)
  }

  showRestaurants(){
    this.props.history.push({
      pathname: '/restaurants',
    })
  }

  showLineSuggest(event){
    // console.log(event.target.name, event.target.value)
    axios
    .get('https://api.ekispert.jp/v1/json/operationLine?key=' + stationKey + '&name=ＪＲ' + event.target.value
    )
    .then((results) => {
      console.log(results)
      if(results.data.ResultSet.Line){
        // items = results.data.ResultSet.Line
        this.setState({
          railSuggestions: results.data.ResultSet.Line,
        })
      } else {
      }
      console.log(this.state)
    })
    .catch((error) => {
      console.log(error)
    })
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  getDepaDest(event){
    this.state.lineName = event.target.value
    // this.setState({
    //   [event.target.name]: event.target.value,
    // })
    axios
    .get('http://0.0.0.0:3000/train?line=' + this.state.lineName)
    .then((results) => {
     console.log(results)
    })
    .catch((error) => {
     console.log(error)
    })
    console.log(this.state)
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.div}>
        <div　className={classes.pageDesc}>
          電車経路沿線の飲食店を一括検索！！
        </div>
        <div className={classes.textFields}>
          <div className={classes.tFieldDesc}>
            路線名から出発駅と到着駅を入力し検索！！
          </div>
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
                    variant="outlined"
                    label="路線"
                    InputProps={getInputProps({
                      placeholder: 'Search a country (start with a)',
                      onChange: this.showLineSuggest,
                      onBlur: this.getDepaDest,
                    })}
                    name="lineName"
                    value={this.state.lineName}
                  />
                <div {...getMenuProps()}>
                  {isOpen && inputValue.length !== 0　? (
                      (this.state.railSuggestions.length > 1) ? (
                        <Paper square>
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
          <Select
            value={this.state.depa}
            options={this.state.depaSuggestions}
            placeholder=""
          />
          <Select
            value={this.state.dest}
            options={this.state.destSuggestions}
            placeholder=""
          />
          <TextField
            id="id"
            className={classes.textField}
            variant="outlined"
            label="出発駅"
            InputProps={inputProps}
          />
          <TextField
            id="id"
            className={classes.textField}
            variant="outlined"
            label="到着駅"
            InputProps={inputProps}
          />
        <Button variant="outlined" color="secondary" onClick={this.showRestaurants}>
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
