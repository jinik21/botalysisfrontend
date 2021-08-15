import React from "react";


class AdminProfilePage extends React.Component{
  state={
    data:{
      employeeName:'',
    }
  }
  onChange =e=>this.setState({data:{...this.state.data,[e.target.name]:e.target.value}});
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
              {/* <tr>
                <th width="30%">Academic Year	</th>
                <td width="2%">:</td>
                <td>2020</td>
              </tr> */}
              {/* <tr>
                <th width="30%">Gender</th>
                <td width="2%">:</td>
                <td>Male</td>
              </tr> */}
              {/* <tr>
                <th width="30%">Religion</th>
                <td width="2%">:</td>
                <td>Group</td>
              </tr> */}
              {/* <tr>
                <th width="30%">blood</th>
                <td width="2%">:</td>
                <td>B+</td>
              </tr> */}
            </table>
          </div>
        </div>
          <div style={{height: '26px'}}></div>
        <div>
          <form> 
            <label htmlFor="employeeSearch"><b>Enter Employee Name</b></label><br/>
            <input id="employeeSearch" className="fadeIn third" type="text" placeholder="Enter Employee Name" name="employeeName" value={this.state.data.employeeName} onChange = {this.onChange} required/>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</div>)
  }
}

export default AdminProfilePage;