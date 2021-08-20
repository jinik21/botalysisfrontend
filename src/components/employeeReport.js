import React from "react";
import react from "react";
import { CircularProgressbar, 
    CircularProgressbarWithChildren,
    buildStyles } from 'react-circular-progressbar';
    const positivePercentage = 66; 
    const negativePercentage = 14;
    const neutralPercentage = 20;
class EmployeeReport extends React.Component{
    
    render(){
        return (
            <div>
                <div className="student-profile py-4">
                    <div className="container">
                        <div className="row">
                        <div className="col-lg-4">
                            <div className="card shadow-sm">
                            <div className="card-header bg-transparent text-center">
                                <img className="profile_img" src="../images/user.svg" alt="student dp"></img>
                                <h3>Ishmam Ahasan Samin</h3>
                            </div>
                            <div className="card-body">
                                <p className="mb-0"><strong class="pr-1">Employee ID:</strong>321000001</p>
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
                                    <td>Delhi</td>
                                </tr>
                                </table>
                            </div>
                            </div>
                            <div style={{height: '26px'}}></div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div>
                    {/* <table className = "reportTable">
                        <tr>
                            <th><CircularProgressbar
                                    className = "percentageBar" 
                                    value={positivePercentage} 
                                    text={`${positivePercentage}%`}
                                    styles={buildStyles({
                                    strokeLinecap: 'butt',
                                    textSize: '16px',
                                    pathTransitionDuration: 0.5,
                                    pathColor: '#92fb61',
                                    textColor: '#92fb61',
                                    backgroundColor: '#E0D2D0',
                                    })} /></th>
                            <th><CircularProgressbar 
                                    value={neutralPercentage} 
                                    text={`${neutralPercentage}%`}
                                    styles={buildStyles({
                                    strokeLinecap: 'butt',
                                    textSize: '16px',
                                    pathTransitionDuration: 0.5,
                                    pathColor: '#d6d6d6',
                                    textColor: '#d6d6d6',
                                    backgroundColor: '#E0D2D0',
                                    })} /></th>
                            <th><CircularProgressbar 
                                    value={negativePercentage} 
                                    text={`${negativePercentage}%`}
                                    styles={buildStyles({
                                        strokeLinecap: 'butt',
                                        textSize: '16px',
                                        pathTransitionDuration: 0.5,
                                        pathColor: '#f88',
                                        textColor: '#f88',
                                        backgroundColor: '#E0D2D0',
                                    })} /></th>
                        </tr>
                    </table> */}
                    {/* <button type="submit" onClick=>
                        See All Previous Uploads
                    </button> */}
                </div>
            </div>
        );
    }
};

export default EmployeeReport;