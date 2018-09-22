import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import styles from '../assets/top.css'

const App = () => (
  <BrowserRouter>
    <div>
     <ul>
       <li><Link to='/'>Home</Link></li>
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

const Top = () => (
  <div>
    <h2 className={styles.topTitle}>Top</h2>
    <p>Top</p>
  </div>
)
const Routes = () => (
  <div>
    <h2 className={styles.topTitle}>Routes</h2>
    <p>Routes</p>
  </div>
)
const Restaurants = () => (
  <div>
    <h2>Restaurants</h2>
    <p>Restaurants</p>
  </div>
)
const Restaurant = () => (
  <div>
    <h2>Restaurant</h2>
    <p>Restaurant</p>
  </div>
)

export default App
