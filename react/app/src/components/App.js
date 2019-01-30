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
import { AppBar, Toolbar, Typography, IconButton, Grid, Hidden} from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons'
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
    height: '10%',
    margin: '10px',
    background: '#fffd',
  },
  grow: {
    flexGrow: 1,
  },
  toolBar: {
    height: '100%',
  },
  gridContainer: {
    height: '100%',
  },
  grid: {
    height: '100%',
  },
  titleLink: {
    display: 'flex',
    height: '100%',
    textDecoration: 'none',
  },
  logo: {
    // width: '10vw',
    height: '50%',
    margin: '2.5vh 0 2.5vh 0',
  },
  appName: {
    // width: '10vw',
    height: '50%',
    margin: '2.5vh 0 2.5vh 0',
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
            <Toolbar className={classes.toolBar}>
                  <Link to='/' className={classes.titleLink}>
                    <img className={classes.logo} src='./src/assets/image/logo.png'></img>
                    <img className={classes.appName} src='./src/assets/image/app_name.png'></img>
                  </Link>
                <div className={classes.grow} />
                <Hidden xsDown>
                  <Link to='/desc' className={classes.descLink}>
                    <Typography
                      variant='subheading'
                      className={classes.titleTypo}>
                      このサイトについて
                    </Typography>
                  </Link>
                </Hidden>
                <Hidden smUp>
                  <Link to='/desc' className={classes.descLink}>
                    <Typography
                      variant='subheading'
                      className={classes.titleTypo}>
                      <InfoOutlined></InfoOutlined>
                    </Typography>
                  </Link>
                </Hidden>
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
