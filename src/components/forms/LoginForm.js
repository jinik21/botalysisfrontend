import React from 'react';
import propTypes from 'prop-types';
import {Button} from 'semantic-ui-react';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import { withRouter } from 'react-router';

 class LoginForm extends React.Component {
  constructor(props){
    super(props); 
   this.state = {

     //creating the data variable that holds the email and password to be passed on
     data: {
       email: '',
       password: ''
     },
     loading: false,
     errors: {}
   }
  };

   //Checks for the change of state and then loads the data entered in the form to the state.
   onChange = e => this.setState({data: {...this.state.data, [e.target.name]: e.target.value}});

   /*onSubmit = (e) => {
     //Prevents the page from refreshing while submitting a form
     e.preventDefault();
     //This submits the data to the parent component.
     this.props.submit(this.state.data);
     //alert('Username is: ' + username.data.email);
   };*/
   onSubmitSignIn=(event)=>{
     event.preventDefault();
    fetch('http://localhost:3001/api/signin',{
        method:'post',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({
            email:this.state.data.email,
            password:this.state.data.password,
        })
    })
        .then(response=>response.json())
        .then(user=>{
          console.log(user);
            if(user.email){
              localStorage.setItem("user", JSON.stringify(user));
              this.props.history.push("/employeePage");
            }
            else{
                alert('No matching Credentials!');
            }
        })
  }
   render() {
     const {data} = this.state;

     return(


        <form onSubmit = {this.onSubmitSignIn} >
            <label htmlFor="email"><b>Email</b></label><br/>
            <input id="login" className="fadeIn second" type="email" placeholder="Enter Email" id="email" name="email" value={data.email} onChange = {this.onChange} required/>

            <br/><br/>

            <label htmlFor="password"><b>Password</b></label><br/>
            <input id="password" className="fadeIn third" type="password" placeholder="Enter Password" id="password" name="password" value={data.password} onChange = {this.onChange} required/>


            <br/><br/>
            <label htmlFor="admin"><b>Would you like to Login as an Admin?</b></label><br/>
            <Toggle
            defaultChecked={this.state.admin}
            name='admin'
            value='true' onChange = {this.onChange}/>
            <br/><br/>
            <Button style={{marginTop:'0'}}type="submit" primary>Signin</Button>
        </form>


     );
    }
}

 LoginForm.propTypes = {
   submit: propTypes.func.isRequired
 };

 export default withRouter(LoginForm);
