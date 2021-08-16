import React from 'react';
import {Link} from "react-router-dom";
import {Button} from 'semantic-ui-react';
import './Logo.png';

const HomePage = () => (
<div className="ui container">
  <img src={"./Logo.svg"}/>
  <h1>Welcome</h1>
  <Link to='/login' className="button"> Signin </Link><br/>
  <Link to='/registration' className ="button"> Signup</Link>
</div>

);

export default HomePage;
