import React from "react";
import AudioInput from "./forms/audioInput";


  function EmployeeProfilePage(){
    const u = JSON.parse(localStorage.getItem("user"));
    return(
    <div className="student-profile py-4">
  <div className="container">
    <div className="row">
      <div className="col-lg-4">
        <div className="card shadow-sm">
          <div className="card-header bg-transparent text-center">
            <img className="profile_img" src="../images/user.svg" alt="student dp"></img>
            <h3>{u.name}</h3>
          </div>
          <div className="card-body">
            <p className="mb-0"><strong class="pr-1">Username: </strong>{u.email.substring(0, u.email.lastIndexOf("@"))}</p>
          </div>
        </div>
      </div>
      <div className="col-lg-8">
        <div className="card shadow-sm">
          <div className="card-header bg-transparent border-0">
            <h3 className="mb-0"><i class="far fa-clone pr-1"></i>General Information</h3>
          </div>
          <div className="card-body pt-0">
            <table className="table table-bordered">
              <tr>
                <th width="30%">Branch</th>
                <td width="2%">:</td>
                <td>{u.branch}</td>
              </tr>
            </table>
          </div>
        </div>
          <div style={{height: '26px'}}></div>
        <div className="card shadow-sm">
          <div className="card-header bg-transparent border-0">
            <h3 className="mb-0"><i class="far fa-clone pr-1"></i>Add Audio File</h3>
            <AudioInput/>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</div>
    )
  }

export default EmployeeProfilePage;