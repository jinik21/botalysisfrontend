import React from 'react';
import propTypes from 'prop-types';
import {Button} from 'semantic-ui-react';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import { withRouter } from 'react-router-dom';


 class LoginForm extends React.Component {
  constructor(props){
    super(props); 
   this.state = {
     data: {
       email: '',
       password: '',
       admin:'false'
     },
     loading: false,
     errors: {}
   }
  };

   onChange = e => this.setState({data: {...this.state.data, [e.target.name]: e.target.value}});
   onChangeToggle=e=>{
    if(e.target.value==='false'){
      this.setState({data:{...this.state.data,[e.target.name]:'true'}});
    }
    else{
      this.setState({data:{...this.state.data,[e.target.name]:'false'}});
    }
    console.log(this.state.data.admin);
   }
   onSubmitSignIn=(event)=>{
     console.log(this.state.data.admin);
     event.preventDefault();
    fetch('https://botalysis.herokuapp.com/api/signin',{
        method:'post',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({
            email:this.state.data.email,
            password:this.state.data.password,
            admin:this.state.data.admin,
        })
    })
        .then(response=>response.json())
        .then(user=>{
          console.log(user.isvalid);
            if(user.email  && user.isvalid===false){
              localStorage.setItem("user", JSON.stringify(user));
              this.props.history.push("/employeePage");
            }
            else if(user.email  && user.isvalid===true){
              localStorage.setItem("user", JSON.stringify(user));
              this.props.history.push("/adminPage");
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
            <input className="fadeIn second" type="email" placeholder="Enter Email" id="email" name="email" value={data.email} onChange = {this.onChange} required/>

            <br/><br/>

            <label htmlFor="password"><b>Password</b></label><br/>
            <input className="fadeIn third" type="password" placeholder="Enter Password" id="password" name="password" value={data.password} onChange = {this.onChange} required/>


            <br/><br/>
            <label htmlFor="admin"><b>Would you like to Login as an Admin?</b></label><br/>
            <Toggle
            //defaultChecked={this.state.data.admin}
            name='admin'
            value={data.admin} onChange = {this.onChangeToggle}/>
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
