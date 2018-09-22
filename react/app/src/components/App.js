import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import styles from '../assets/app.css'
import Top from './Top'
import Routes from './Routes'
import Restaurants from './Restaurants'
import Restaurant from './Restaurant'

const App = () => (
  <BrowserRouter>
    <div>
     <ul>
       <li><Link to='/'>Top</Link></li>
       <li><Link to='/routes'>Routes</Link></li>
       <li><Link to='/restaurants'>Restaurants</Link></li>
       <li><Link to='/restaurant'>Restaurant</Link></li>
     </ul>

      <Route exact path='/' component={Top} />
      <Route exact path='/routes' component={Routes} />
      <Route exact path='/restaurants' component={Restaurants} />
      <Route exact path='/restaurant' component={Restaurant} />
    </div>
  </BrowserRouter>
)

export default App
