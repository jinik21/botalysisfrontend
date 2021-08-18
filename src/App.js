import React from 'react';
import {Route} from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import Welcome from "./components/pages/Welcome";
import Signout from "./components/pages/Signout";
import LandingPage from "./components/pages/LandingPage";
import LoginPage from "./components/pages/LoginPage";
import RegistrationPage from "./components/pages/RegistrationPage";
import EmployeeProfilePage from './components/employeeProfilePage';
import AdminProfilePage from './components/adminPage'
import EmployeeReport from './components/employeeReport';


//This project is used in a hackathon

const App = () => (

<section className="hero">
  <Route path="/" exact component = {HomePage}/>
  <Route path="/login" exact component = {LoginPage}/>
  <Route path="/registration" exact component = {RegistrationPage}/>
  <Route path="/landing" exact component = {LandingPage}/>
  <Route path="/employeePage" exact component = {EmployeeProfilePage}/>
  <Route path="/adminPage" exact component = {AdminProfilePage}/>
  <Route path="/employeeReport" exact component={EmployeeReport}/>
  <Route path="/welcome" exact component={Welcome}/>
</section>
);

export default App;
