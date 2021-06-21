import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import DistrictFinderPage from './pages/DistrictFinderPage'
import ImageClassifierPage from './pages/ImageClassifierPage'
import TutorialPage from './pages/TutorialPage'

class App extends Component {

  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Switch>
            <Route path='/' exact component={DistrictFinderPage} />
            <Route path='/districtfinder' component={DistrictFinderPage} />
            <Route path='/imageclassifier' component={ImageClassifierPage} />
            <Route path='/tutorial' component={TutorialPage} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
