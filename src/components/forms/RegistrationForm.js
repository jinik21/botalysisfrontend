import React from 'react';
import propTypes from 'prop-types';
import {Button } from 'semantic-ui-react';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

 class RegistrationForm extends React.Component {
   state = {

     //Creats an object that can store the variables
     data: {
       username: '',
       email: '',
       phone: '',
       branch: '',
       password: '',
       cnfrmpassword: '',
       admin:'false'
     },
     loading: false,
     errors: {}
   };

   //Checks for the change of state and then assigns the form data to the state.
   onChange = e => {
     this.setState({data: {...this.state.data, [e.target.name]: e.target.value}});
   }
   onbranchChange = e => {
     this.setState({data: {...this.state.data, branch: e.value}});
   }
   onSubmitSignUp = (event) => {
     event.preventDefault();
    if (this.state.data.password.length >= 8 && this.state.data.cnfrmpassword.length >= 8 && this.state.data.phone.length==10) {
      if((this.state.data.password === this.state.data.cnfrmpassword )&& (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.data.email,))){
        fetch('http://localhost:3001/api/signup', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          name: this.state.data.username,
          email: this.state.data.email,
          phone: this.state.data.phone,
          branch: this.state.data.branch,
          password: this.state.data.password,
          picture: "https://i.dlpng.com/static/png/5066008-circled-user-icon-user-profile-icon-png-png-image-transparent-profile-icon-png-820_860_preview.png"
        })
      })
        .then(response => response.json())
        .then(user => {
          console.log(user);
          if (user.id) {
            this.props.loadUser(user);
            console.log(this.props);
            // this.props.onRouteChange('home');
            this.setState({ loading: true });
          }
        })
      }
      else{
        this.setState({ loading: false });
      }
  }
  else {
    this.setState({ loading: false });
  }
  }
   render() {
     const {data} = this.state;
     const options = [
      'None','Mumbai, India', 'Manhattan, USA', 'Sydney, Australia', 'London, UK', 'Delhi, India'
    ];
    const defaultOption = options[0];

     return(

      <div>
      <form onSubmit = {this.onSubmitSignUp} >

          <label htmlFor="username"><b>Full Name</b></label><br/>
          <input type="username" placeholder="Enter Username" id="username" name="username" value={data.username} onChange = {this.onChange} required/>

          <br/><br/>

          <label htmlFor="email"><b>Email</b></label><br/>
          <input type="email" placeholder="Enter Email" id="email" name="email" value={data.email} onChange = {this.onChange} required/>

          <br/><br/>

          <label htmlFor="phone"><b>Phone No.</b></label><br/>
          <input placeholder="Phone(with country code)" id="phone" name="phone" value={data.phone} onChange = {this.onChange} required/>

          <br/><br/>

          <label htmlFor="password"><b>Password</b></label><br/>
          <input type="password" placeholder="Enter Password" id="password" name="password" value={data.password} onChange = {this.onChange} required/>
          <br/><br/>

          <label htmlFor="password"><b>Confirm Password</b></label><br/>
          <input type="password" placeholder="Enter Password" id="password" name="cnfrmpassword" value={data.cnfrmpassword} onChange = {this.onChange} required/>
          <br/><br/>
          
          <label htmlFor="branch"><b>Branch</b></label><br/>
          <Dropdown className="branch" id="email" name="branch" options={options} onChange={this.onbranchChange} value={data.branch} placeholder="Select an option" required  />
          <br/><br/>

          <button type="submit" className="button">Register</button>
      </form>
    </div>

     );
    }
}

 RegistrationForm.propTypes = {
   submit: propTypes.func.isRequired
 };

 export default RegistrationForm;
