import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import EventForm from '../../features/event/EventForm/EventForm';
import EventDetailedPage from '../../features/event/EventDetailed/EventDetailedPage';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import HomePage from '../../features/home/HomePage';
import TestComponent from '../../features/testarea/TestComponent';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path='/' component={HomePage} />
        </Switch>

        <Route 
          path="/(.+)" 
          render={() => (
            <React.Fragment>
              <NavBar />
              <Container className="main">
                <Switch>
                  <Route path='/events' component={EventDashboard} />
                  <Route path='/test' component={TestComponent} />
                  <Route path='/event/:id' component={EventDetailedPage} />
                  <Route path='/people' component={PeopleDashboard} />
                  <Route path='/profile/:id' component={UserDetailedPage} />
                  <Route path='/settings' component={SettingsDashboard} />
                  <Route path='/createEvent' component={EventForm} />
                </Switch>
              </Container>
            </React.Fragment>
          )}
        />
        
      </React.Fragment>
    );
  }
}

export default App;
