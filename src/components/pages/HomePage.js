import React from 'react';
import {Link} from "react-router-dom";
import {Button} from 'semantic-ui-react';
import './Logo.png';

const HomePage = () => (
<div className="ui container">
  <img style={{height: '75%', width: '75%'}} src={"https://firebasestorage.googleapis.com/v0/b/botalysis.appspot.com/o/Logo.png?alt=media&token=eb52e650-94ba-4c3b-9344-5025455fa0c1"}/>
  <h1>Welcome</h1>
  <Link to='/login' className="button"> Signin </Link><br/>
  <Link to='/registration' className ="button"> Signup</Link>
</div>

);

export default HomePage;
