import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import * as PusherPushNotifications from "@pusher/push-notifications-web";

const NavBar = () => (
  <div className="navbar">
    <h3>Task Manager</h3>
    <Link to="/">Current Tasks</Link>
    <Link to="/completed">Completed Tasks</Link>
  </div>
);

const Template = (props) => (
  <div>
    <NavBar />
    <p className="page-info">
      {props.title}:
    </p>
    <ul className={props.status}>
        <li>Task 1</li>
        <li>Task 2</li>
        <li>Task 3</li>
    </ul>
  </div>
);

const CurrentTasks = () => (
  <Template title="Current Tasks" status="Current"/>
);

const CompletedTasks = () => (
  <Template title="Completed Tasks" status="Completed"/>
);

class App extends Component {
  render() {
    return (
      <>
      <BrowserRouter>
        <div>
          <Route exact path="/" component={CurrentTasks}/>
          <Route path="/completed" component={CompletedTasks}/>
        </div>
      </BrowserRouter>

      <button onClick={ () => this.startPwa()} >Subscribe to PWA notifications</button>

      </>
    );
  }

  startPwa(){

    console.log("startPwa");

    const beamsClient = new PusherPushNotifications.Client({
      instanceId: '47aee597-bc8e-4b71-8701-e7c53da0021f',
    });
  
    beamsClient.start()
      .then(() => beamsClient.addDeviceInterest('debug-hello'))
      .then(() => console.log('Successfully registered and subscribed!'))
      .catch(console.error);
  
  }
}

export default App;