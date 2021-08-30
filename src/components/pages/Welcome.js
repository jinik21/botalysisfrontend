import React from 'react';
import {Link} from "react-router-dom";
import './Logo.png';

function Welcome(){
    return (
        <div className="ui container">
            <img style={{height: '75%', width: '75%',padding:'0px',margin:'0px'}} alt="img" src={"https://firebasestorage.googleapis.com/v0/b/botalysis.appspot.com/o/Logo.png?alt=media&token=eb52e650-94ba-4c3b-9344-5025455fa0c1"}/>
            <h1 style={{alignContent: 'center'}}>Welcome</h1>
            <p style={{color: '#4c4a37'}}>Proceed to Signin</p>
            <Link to='/login' className="button"> Signin </Link><br/>
        </div>
    );
}

export default Welcome;