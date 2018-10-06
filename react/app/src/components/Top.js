import React from 'react'
// import { BrowserRouter, Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router';
// import styles from '../assets/top.css'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';
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

class Top extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lineName: '',
    }
    this.showRestaurants = this.showRestaurants.bind(this)
    this.showLineSuggest = this.showLineSuggest.bind(this)
  }

  showRestaurants(){
    this.props.history.push({
      pathname: '/restaurants',
    })
  }

  showLineSuggest(event){
    console.log(event.target.name, event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
    // axios
    // .get('https://api.ekispert.jp/v1/json/operationLine?key=' + stationKey, { params: {
    //   'name': this.state.lineName,
    // }})
    // .then((results) => {
    //     console.log(results)
    // })
    // .catch((error) => {
    //     console.log(error)
    // })
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
          <TextField
            id="id"
            className={classes.textField}
            variant="outlined"
            label="路線"
            InputProps={inputProps}
            name="lineName"
            value={this.state.lineName}
            onChange={this.showLineSuggest}
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
}

export default withRouter(withStyles(styles)(Top));
