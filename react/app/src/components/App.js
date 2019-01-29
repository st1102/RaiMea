import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
// import styles from '../assets/app.css'
import Top from './Top'
import Desc from './Desc'
import Restaurants from './Restaurants'
import Restaurant from './Restaurant'
// import createMuiTheme from '@material-ui/core/styles'
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, IconButton} from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/Bookmark';
// import topBackgroundImage from '../assets/image/top_background.jpg';

// const style = {
//
// };

const styles = {
  div: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  appBar: {
    width: 'calc(100% - 20px)',
    margin: '10px',
    background: '#fffd',
  },
  grow: {
    flexGrow: 1,
  },
  titleLink: {
    display: 'flex',
    textDecoration: 'none',
  },
  logo: {
    height: '60px',
  },
  appName: {
    height: '50px',
    margin: '5px 0 5px 0',
  },
  descLink: {
    textDecoration: 'none',
  },
};

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <BrowserRouter>
        <div className={classes.div}>
          <AppBar position='static' className={classes.appBar}>
            <Toolbar>
              <Link to='/' className={classes.titleLink}>
                <img className={classes.logo} src='./src/assets/image/logo.png'></img>
                <img className={classes.appName} src='./src/assets/image/app_name.png'></img>
              </Link>
              <div className={classes.grow} />
                <Link to='/desc' className={classes.descLink}>
                  <Typography
                    variant='subheading'
                    className={classes.titleTypo}>
                    このサイトについて
                  </Typography>
                </Link>
            </Toolbar>
          </AppBar>

          <Route exact path='/' component={Top} />
          <Route exact path='/desc' component={Desc} />
          <Route exact path='/restaurants' component={Restaurants} />
          <Route exact path='/restaurant' component={Restaurant} />
        </div>
      </BrowserRouter>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
