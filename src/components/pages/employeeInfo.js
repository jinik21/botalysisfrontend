import React from "react";

class EmployeeInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          u: JSON.parse(localStorage.getItem("user")),
          data:null,
          tableShow: false
        }
      };
    clicked=async () => {
         try {
            console.log(this.state.u);
            // setTimeout(()=>{},5000);
            fetch('http://localhost:3001/api/allsentimentuser', {
              method: 'post',
              headers: { 'Content-type': 'application/json' },
              body: JSON.stringify({
                email: this.state.u.email
              })
            })
              .then(response => response.json())
              .then(data => {
                console.log(data);
                this.setState({data:data})
                this.setState({tableShow:true})
              })
          } 
          catch (err) {
            console.log(err)
          }
      }; 
    render(){
        return (
            <div>
                <button style={{backgroundColor:'rgba(56, 63, 95, 0.2)'}} onClick={this.clicked} className="uploadButton">
                    See All Previous Results
                </button>
           

            {this.state.tableShow?<table style={{textTransform:"lowercase"}}>
                <tr>
                    <th>Audio</th>
                    <th>date</th>
                    <th>positive</th>
                    <th>Negative</th>
                    <th>Neutral</th>
                    <th>Net Sentiment</th>
                </tr>
                {this.state.data.map(ele =>(
                    <tr>
                        <th><a href={ele.audiolink} target="_blank">Audio Link</a></th>
                        <th>{ele.date.substring(0,ele.date.indexOf("T"))}</th>
                        <th>{ele.positive}</th>
                        <th>{ele.negative}</th>
                        <th>{ele.neutral}</th>
                        <th>{ele.sentiment}</th>
                    </tr>
                ))}
            </table>:<div></div>}
            </div>
        );
    }    
};

export default EmployeeInfo;