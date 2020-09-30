import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-notifications/lib/notifications.css';
import Home from "./Home";
import Dashboard from "./Dashboard";
import Student from "./Students"
import Teachers from "./Teachers";
import Courses from "./Courses";
import Enrollments from "./Enrollments"
import EditStudent from "./EditStudent";
import {Route, Switch, BrowserRouter as Router, useParams} from 'react-router-dom';

function App() {
    let {id} = useParams();

  return (
      <Router>
          <Switch>
              <Route exact path="/">
                  <Home />
              </Route>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/students" component={Student} />
              <Route path="/teachers" component={Teachers} />
              <Route path="/courses" component={Courses} />
              <Route path="/enrollments" component={Enrollments} />
          </Switch>
      </Router>
  );
}

export default App;
