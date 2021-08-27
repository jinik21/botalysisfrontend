import React from 'react';
import {Route} from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import Welcome from "./components/pages/Welcome";
import LandingPage from "./components/pages/LandingPage";
import LoginPage from "./components/pages/LoginPage";
import RegistrationPage from "./components/pages/RegistrationPage";
import EmployeeProfilePage from './components/employeeProfilePage';
import AdminProfilePage from './components/adminPage'
import EmployeeReport from './components/employeeReport';
import PrivateRoute from './route/PrivateRoute';

//This project is used in a hackathon
function App(){
  return(
    <div>
    <section className="hero">
      <Route path="/" exact component = {HomePage}/>
      </section>
      <section className="hero">
      <Route path="/login" exact component = {LoginPage}/>
      </section>
      <section className="hero">
      <Route path="/registration" exact component = {RegistrationPage}/>
      </section>
      <section className="hero">
      <Route path="/landing" exact component = {LandingPage}/>
      </section>
      <PrivateRoute path="/employeePage" exact component = {EmployeeProfilePage}/>
      <Route path="/adminPage" exact component = {AdminProfilePage}/>
      <section className="hero">
      <Route path="/employeeReport" exact component={EmployeeReport}/>
      </section>
      <section className="hero">
      <Route path="/welcome" exact component={Welcome}/>
      </section>
      </div>
  );
}

export default App;
