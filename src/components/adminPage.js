import React from "react";
import Signout from "./pages/Signout";


class AdminProfilePage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:{
      email:'',
      showReport:false,
      info:[],
      }
    }
  }

  onChange =e=>this.setState({data:{...this.state.data,[e.target.name]:e.target.value}});

  clicked=async (e) => {
    e.preventDefault();
    try {
       //console.log(this.state.u);
       // setTimeout(()=>{},5000);
       fetch('http://localhost:3001/api/allusersaudioadmin', {
         method: 'post',
         headers: { 'Content-type': 'application/json' },
         body: JSON.stringify({
           email: this.state.data.email
         })
       })
         .then(response => response.json())
         .then(data1 => {
           //console.log(data1);
           this.setState({data: {...this.state.data, info: data1}});
           //this.setState({[this.state.data.info]:data1})
           this.setState({data: {...this.state.data, showReport: true}});
           console.log(this.state.data.showReport);
         })
     } 
     catch (err) {
       console.log(err)
     }
 }; 
  render(){
    return(
    <div>
    <div class="student-profile py-4">
  <div class="container">
    <div class="row">
      <div class="col-lg-4">
        <div class="card shadow-sm">
          <div class="card-header bg-transparent text-center">
            <img class="profile_img" src="https://i.dlpng.com/static/png/5066008-circled-user-icon-user-profile-icon-png-png-image-transparent-profile-icon-png-820_860_preview.png" alt="student dp"></img>
            <h3>Ishmam Ahasan Samin</h3>
          </div>
          <div class="card-body">
            <p class="mb-0"><strong class="pr-1">Employee ID:</strong>321000001</p>
            {/* <p class="mb-0"><strong class="pr-1">Class:</strong>4</p>
            <p class="mb-0"><strong class="pr-1">Section:</strong>A</p> */}
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="card shadow-sm">
          <div class="card-header bg-transparent border-0">
            <h3 class="mb-0"><i class="far fa-clone pr-1"></i>General Information</h3>
          </div>
          <div class="card-body pt-0">
            <table class="table table-bordered">
              <tr>
                <th width="30%">Branch</th>
                <td width="2%">:</td>
                <td>Delhi</td>
              </tr>
            </table>
          </div>
        </div>
          <div style={{height: '26px'}}></div>
        <div>
          <form onSubmit={this.clicked}> 
            <label htmlFor="employeeSearch"><b>Enter Employee Email</b></label><br/>
            <input id="employeeSearch" className="fadeIn third" type="text" placeholder="Enter Employee Email" name="email" value={this.state.data.email} onChange = {this.onChange} required/>
            <button type="submit" className="button">Search</button>
          </form>
        </div>
        <div>
        <Signout />
        </div>
        {this.state.data.showReport?
        <div>
        <table style={{textTransform:"lowercase"}}>
                <tr>
                    <th>Audio</th>
                    <th>date</th>
                    <th>positive</th>
                    <th>Negative</th>
                    <th>Neutral</th>
                    <th>Net Sentiment</th>
                </tr>
                {this.state.data.info.map(ele =>(
                    <tr>
                        <th><a href={ele.audiolink} target="_blank">Audio Link</a></th>
                        <th>{ele.date.substring(0,ele.date.indexOf("T"))}</th>
                        <th>{ele.positive}</th>
                        <th>{ele.negative}</th>
                        <th>{ele.neutral}</th>
                        <th>{ele.sentiment}</th>
                    </tr>
                ))}
            </table></div>:<div></div>}
      </div>
    </div>
  </div>
</div>
</div>)
  }
}

export default AdminProfilePage;