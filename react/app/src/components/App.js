import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import styles from '../assets/app.css'
import Top from './Top'
import Routes from './Routes'
import Restaurants from './Restaurants'
import Restaurant from './Restaurant'
import createMuiTheme from '@material-ui/core/styles'
import {AppBar, Typography} from '@material-ui/core'

const App = () => (
  <BrowserRouter>
    <div>
      <ul>
       <li><Link to='/'>Top</Link></li>
       <li><Link to='/routes'>Routes</Link></li>
       <li><Link to='/restaurants'>Restaurants</Link></li>
       <li><Link to='/restaurant'>Restaurant</Link></li>
      </ul>

      <AppBar position="static" color="default">
        <Typography variant="title" color="inherit">
          RaiMea
        </Typography>
     　</AppBar>

      <Route exact path='/' component={Top} />
      <Route exact path='/routes' component={Routes} />
      <Route exact path='/restaurants' component={Restaurants} />
      <Route exact path='/restaurant' component={Restaurant} />
    </div>
  </BrowserRouter>
)

export default App
