import React, {lazy, Suspense} from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Switch} from 'react-router'


const Home = lazy(() => import('./containers/home/home'))
const About = lazy(() => import('./containers/about/about'))

const AppRouter = () => (
  <Router>
    <div>
      <Switch>
        <Route  path='/about' component={() => <Suspense fallback={<div>loading</div>}><About/></Suspense>}/>
        <Route  exact path='/' component={() => <Suspense fallback={<div>loading</div>}><Home/></Suspense>}/>
      </Switch>
    </div>
  </Router>
)

export default AppRouter;
