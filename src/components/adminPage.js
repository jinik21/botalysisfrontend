import React from "react";
import Signout from "./pages/Signout";


class AdminProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        u: JSON.parse(localStorage.getItem("user")),
        email: '',
        showReport: false,
        info: [],
        isAll:false,
      }
    }
  }

  onChange = e => this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } });

  clicked = async (e) => {
    e.preventDefault();
    try {
      //console.log(this.state.u);
      // setTimeout(()=>{},5000);
      fetch('https://botalysis.herokuapp.com/api/allusersaudioadmin', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          email: this.state.data.email
        })
      })
        .then(response => response.json())
        .then(data1 => {
          this.setState({ data: { ...this.state.data, info: data1 } });
          this.setState({ data: { ...this.state.data, showReport: true, } });
          console.log(this.state.data.showReport);
        })
    }
    catch (err) {
      console.log(err)
    }
  };

  allClicked = async () => {
    // e.preventDefalut();
    try {
      await fetch('https://botalysis.herokuapp.com/api/allusersallaudioadmin', {
        method: 'get',
        headers: { 'Content-type': 'application/json' }
      })
        .then(response => response.json())
        .then(data1 => {
          console.log(data1);
          this.setState({ data: { ...this.state.data, info: data1 } });
          console.log(this.state.data.info);
          this.setState({ data: { ...this.state.data, showReport: true,isAll:true } });
          console.log(this.state.data.showReport);
        })
    }
    catch (err) {
      console.log(err)
    }
  };

  sentimentName = (s) => {
    if (s === 0) {
      return "Neutral";
    }
    else if (s > 0) {
      return "Positive";
    }
    else {
      return "Negative";
    }
  }
  netSentiment = () => {
    var s;
    this.state.data.info.map(ele => (s = s + ele.netSentiment));
    var sent = s / (this.state.data.length);
    if (sent === 0) {
      return "Neutral";
    } else if (sent > 0) {
      return "Positive";
    } else {
      return "Negative";
    }
  };
  render() {
    return (
      <div>
        <section className="hero">
          <div class="student-profile py-4">
            <div class="container">
              <div class="row">
                <div class="col-lg-4">
                  <div class="card shadow-sm">
                    <div class="card-header bg-transparent text-center">
                      <img class="profile_img" src="../images/user.svg" alt="student dp"></img>
                      <h3>{this.state.data.u.name}</h3>
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
                          <td>{this.state.data.u.branch}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <div style={{ height: '26px' }}></div>
                  <div>
                    <form onSubmit={this.clicked}>
                      <label htmlFor="employeeSearch"><b>Enter Employee Email</b></label><br />
                      <input id="employeeSearch" className="fadeIn third" type="text" placeholder="Enter Employee Email" name="email" value={this.state.data.email} onChange={this.onChange} required />
                      <button type="submit" className="button">Search</button>
                    </form>
                    {/* <form onSubmit={this.allClicked}> */}
                      <button  className="button" onClick={this.allClicked}>Show All Records</button>
                    {/* </form> */}

                  </div>
                  <div>
                    <Signout />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="hero1">
          <div>
          {this.state.data.showReport ?
            <div>
              <table style={{
                textTransform: "lowercase"
              }}>
                <tr>
                  <th>Audio</th>
                  {this.state.data.isAll?<th>Employee Email</th>:<th></th>}
                  <th>date</th>
                  <th>positive</th>
                  <th>Negative</th>
                  <th>Neutral</th>
                  <th>Net Sentiment</th>
                </tr>
                {this.state.data.info.map(ele => (
                  <tr>
                    <th><a href={ele.audiolink} target="_blank">Audio Link</a></th>
                    {this.state.data.isAll?<th>{ele.email}</th>:<th></th>}
                    <th>{ele.date.substring(0, ele.date.indexOf("T"))}</th>
                    <th>{ele.positive}</th>
                    <th>{ele.negative}</th>
                    <th>{ele.neutral}</th>
                    <th>{this.sentimentName(ele.sentiment)}</th>
                  </tr>
                ))}
              </table><h2>Net Sentiment: {this.netSentiment()}</h2></div> : <div></div>}  
            </div>
        </section>

      </div >)
  }
}

export default AdminProfilePage;