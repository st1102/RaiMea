import React from 'react'
// import { BrowserRouter, Route, Link } from 'react-router-dom'
// import styles from '../assets/restaurant.css'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {

};

class Restaurant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    console.log(this.props.location.state)
  }

  render(){
    const { classes } = this.props;

    return (
      <div className={classes.div}>
        <div className={classes.name}>
          {this.props.location.state.restInfo.name}
        </div>
        <div className={classes.eval}>
          <span className={classes.rating}>星：{this.props.location.state.restDetail.rating}</span>
          <span className={classes.reviewCount}>レビュー数：{this.props.location.state.restDetail.review_count}件</span>
        </div>
        <div className={classes.phone}>
          {this.props.location.state.restInfo.display_phone}
        </div>
        <div className={classes.address}>
          {this.props.location.state.restInfo.location.display_address[0] + this.props.location.state.restInfo.location.display_address[0]}
        </div>
        <a className={classes.yelpUrl} href={this.props.location.state.restDetail.url} target='_blank'>Yelpページへ</a>
        <a className={classes.googleUrl} href={'http://www.google.co.jp/search?q=' + this.props.location.state.restInfo.name} target='_blank'>{this.props.location.state.restInfo.name}についてもっと調べる</a>
      </div>
    )
  }
}

Restaurant.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Restaurant);
