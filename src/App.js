import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.scss';
import Auth from './components/auth/auth';
import Home from './components/home/home';
import Profile from './components/profile/profile';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Auth}/>
        {/* MATCH OBJECT COMPETENCIES */}
        <Route exact path='/home/:number' render={props => <Home {...props}/>}/>
        <Route path='/home' component={Home}/>
        <Route path='/profile' component={Profile}/>
      </Switch>
    );
  }
}

export default App;
