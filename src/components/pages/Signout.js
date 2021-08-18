import axios from 'axios';
import {Button } from 'semantic-ui-react';
import './Logo.png';
import React from 'react';
import {Link} from "react-router-dom";

function Signout(){
    const u = JSON.parse(localStorage.getItem("user"));
    function handleSignOut(){
        localStorage.removeItem("user");
    }
    return (
        <Link onClick={handleSignOut} to="/" className="button">Signout</Link>
    )
}

export default Signout;