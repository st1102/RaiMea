import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
// import styles from '../assets/app.css'
import Top from './Top'
import Routes from './Routes'
import Restaurants from './Restaurants'
import Restaurant from './Restaurant'
// import createMuiTheme from '@material-ui/core/styles'
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/Bookmark';
// import topBackgroundImage from '../assets/image/top_background.jpg';

// const style = {
//
// };

const styles = {
  div: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  appBar: {
    width: 'calc(100% - 20px)',
    margin: '10px',
  },
  grow: {
    flexGrow: 1,
  },
  routerList: {
    display: 'flex',
  },
  titleLink: {
    textDecoration: 'none',
  },
  titleTypo: {
    color: 'black',
  },
  icons: {

  },
};

const App = (props) => {
  const { classes } = props;
  return (
    <BrowserRouter>
      <div className={classes.div}>
        <AppBar position='static' color='default' className={classes.appBar}>
          <Toolbar>
            <div className={classes.grow} />
            <Link to='/' className={classes.titleLink}>
              <Typography align='center' variant='title' color='inherit' className={classes.titleTypo}>
                (ロゴ)RaiMea
              </Typography>
            </Link>
            <div className={classes.grow} />
            <div className={classes.icons}>
              <IconButton>
                <Link to='/routes'><BookmarkIcon /></Link>
              </IconButton>
              <IconButton>
                <Link to='/restaurants'><BookmarkIcon /></Link>
              </IconButton>
              <IconButton>
                <Link to='/restaurant'><BookmarkIcon /></Link>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        <Route exact path='/' component={Top} />
        <Route exact path='/routes' component={Routes} />
        <Route exact path='/restaurants' component={Restaurants} />
        <Route exact path='/restaurant' component={Restaurant} />
      </div>
    </BrowserRouter>
  )
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
