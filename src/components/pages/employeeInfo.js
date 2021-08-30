import React from "react";

class EmployeeInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      u: JSON.parse(localStorage.getItem("user")),
      data: null,
      tableShow: false
    }
  };
  clicked = async () => {
    try {
      console.log(this.state.u);
      // setTimeout(()=>{},5000);
      fetch('https://botalysis.herokuapp.com/api/allsentimentuser', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          email: this.state.u.email
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.setState({ data: data })
          this.setState({ tableShow: true })
        })
    }
    catch (err) {
      console.log(err)
    }
  };

  netSentiment = () => {
    var s;
    this.state.data.map(ele => (s = s + ele.netSentiment));
    
    var sent = s / (this.state.data.length);
    if (sent === 0) {
      return "Neutral";
    } else if (sent > 0) {
      return "Positive";
    } else {
      return "Negative";
    }
  }
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
  render() {
    return (
      <div>
        <button style={{ backgroundColor: 'rgba(56, 63, 95, 0.2)' }} onClick={this.clicked} className="uploadButton">
          See All Previous Results
        </button>


        {this.state.tableShow ?
          <div>
            <table style={{ textTransform: "lowercase" }}>
              <tr>
                <th>Audio</th>
                <th>date</th>
                <th>positive</th>
                <th>Negative</th>
                <th>Neutral</th>
                <th>Net Sentiment</th>
              </tr>
              {this.state.data.map(ele => (
                <tr>
                  <th><a href={ele.audiolink} target="_blank">Audio Link</a></th>
                  <th>{ele.date.substring(0, ele.date.indexOf("T"))}</th>
                  <th>{ele.positive}</th>
                  <th>{ele.negative}</th>
                  <th>{ele.neutral}</th>
                  <th>{this.sentimentName(ele.sentiment)}</th>
                </tr>
              ))}
            </table>
            <h2>Net Sentiment: {this.netSentiment()}</h2></div> : <div></div>}
      </div>
    );
  }
};

export default EmployeeInfo;