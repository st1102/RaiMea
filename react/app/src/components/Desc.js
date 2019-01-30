import React from 'react'
// import { BrowserRouter, Route, Link } from 'react-router-dom'
// import styles from '../assets/routes.css'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Typography} from '@material-ui/core';

const styles = theme => ({
  div: {
    width: '70%',
    height: 'calc(100% - 64px - 20px - 10px)',
    margin: '0 15% 0 15%',
    padding: '1px 0 1px 0',
    background: '#fffd',
    // overflow: 'scroll',
  },
  title: {
    margin: theme.spacing.unit*2,
  },
  desc: {
    margin: theme.spacing.unit*2,
  },
  rails: {
    marginTop: '30px',
  },
  railsTitle: {
    margin: theme.spacing.unit*2,
  },
  railsDesc: {
    margin: theme.spacing.unit*2,
  },
  option: {
    marginTop: '30px',
  },
  optionTitle: {
    margin: theme.spacing.unit*2,
  },
  optionDesc: {
    margin: theme.spacing.unit*2,
  },
});

class Desc extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.div}>
        <Typography className={classes.title} variant='headline'>
          ラーメン路線図とは
        </Typography>
        <Typography className={classes.desc} variant='body2'>
          使用路線経路内のラーメン屋を一括検索できるサイトです
          ラーメン好きな方は電車を使って外出する際、使用駅一駅一駅
          検索にかけてラーメン屋を探すことがあるのではないでしょうか
          そのような際、このサイトを使えば一気にラーメン屋を検索することができます
        </Typography>
        <Typography className={classes.rails}>
          <Typography className={classes.railsTitle} variant='title'>
            対応路線
          </Typography>
          <Typography className={classes.railsDesc} variant='body2'>
            駅すぱあと(<a href='https://roote.ekispert.net/ja/'>roote.ekispert.net</a>)内に掲載されている全国の路線
          </Typography>
        </Typography>
        <Typography className={classes.option}>
          <Typography className={classes.optionTitle} variant='title'>
            検索結果について
          </Typography>
          <Typography className={classes.optionDesc} variant='body2'>
            <p>検索結果では駅から徒歩圏内(1km以内)の店舗を表示しています</p>
            <p>検索結果の表示順は駅からの近さ順に表示しています</p>
          </Typography>
        </Typography>
      </div>
    )
  }
}


Desc.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Desc);
