import React from 'react';
import firebase from '../../firebase';
import { CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar';
import { withRouter } from 'react-router-dom';
import ReactLoading from 'react-loading';

var storageRef = firebase.storage().ref();

//const u = JSON.parse(localStorage.getItem("user"));

const toBlob = (file) => {
  return new Blob([file], {
    type: 'audio/wav'
  })
}
var metadata = {
  contentType: 'audio/wav',
};

class AudioInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      u: JSON.parse(localStorage.getItem("user")),
      positivePercentage : null,
      negativePercentage : null,
      neutralPercentage :null,
      tableShow : false,
      isLoading:null,
    }
  };

  onFileChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };
  onFileUpload = async () => {
    const formData = new FormData();
    if(this.state.selectedFile==null){
      alert("No file Selected!!!");
    }
    else{
      formData.append(
        "myFile",
        this.state.selectedFile,
        this.state.selectedFile.name,
      );
      console.log(this.state.selectedFile);
      try {
        const blob = toBlob(this.state.selectedFile);
        this.setState({isLoading:true})
        console.log(blob);
        var mountainsRef = await storageRef.child(this.state.selectedFile.name);
        await mountainsRef.put(blob, metadata);
        const res = await mountainsRef.getDownloadURL();
        console.log(res);
        console.log(this.state.u);
        // setTimeout(()=>{},5000);
        fetch('https://botalysis.herokuapp.com/api/process_audio', {
          method: 'post',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            email: this.state.u.email,
            link: res,
          })
        })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            this.setState({ positivePercentage:0 });
            this.setState({ negativePercentage:0});
            this.setState({ neutralPercentage:0 });
            this.setState({tableShow:true})
            setTimeout(()=>{
              fetch('https://botalysis.herokuapp.com/api/sentiment', {
              method: 'post',
              headers: { 'Content-type': 'application/json' },
              body: JSON.stringify({
                email: this.state.u.email,
              })
            })
              .then(response => response.json())
              .then(data => {
                this.setState({ positivePercentage:data.positive });
                this.setState({ negativePercentage:data.negative});
                this.setState({ neutralPercentage:data.neutral });
                this.setState({isLoading:false});
                console.log(data);
              })
  
            },7000);
            
          })
      } 
      catch (err) {
        console.log(err)
      }
    }
  };
  fileData = () => {
// hello
    if (this.state.selectedFile) {

      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {this.state.selectedFile.name}</p>

          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>

        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {

    return (
      <div>
        <div>
          <input type="file" onChange={this.onFileChange} className="audioInputFile" accept="audio.wav"/>
          <button style={{backgroundColor:'rgba(56, 63, 95, 0.2)'}} onClick={this.onFileUpload} className="uploadButton">
            Upload!
          </button>
        </div>
        {this.fileData()}
        <div>
          <div className="center">
           {this.state.isLoading===true?<div className="center"><ReactLoading type={"bars"} color={"white"} /></div>:<div></div>}
          </div>
          {this.state.tableShow?(<table className="reportTable">
            <tr>
              <th><CircularProgressbarWithChildren
                className="percentageBar"
                value={this.state.positivePercentage}
                //text={`${this.state.positivePercentage}%`}
                styles={buildStyles({
                  strokeLinecap: 'butt',
                  textSize: '12px',
                  pathTransitionDuration: 0.5,
                  pathColor: '#92fb61',
                  textColor: '#92fb61',
                  backgroundColor: '#E0D2D0',
                })} >
                  <p style={{textAlign:"center", marginTop:"-27px", marginLeft:"20px", fontSize:"16px", color:"#92fb61"}}>{this.state.positivePercentage}%</p>
                  </CircularProgressbarWithChildren>
                </th>
              <th><CircularProgressbarWithChildren
                value={this.state.neutralPercentage}
                //text={`${this.state.neutralPercentage}%`}
                styles={buildStyles({
                  strokeLinecap: 'butt',
                  textSize: '8px',
                  pathTransitionDuration: 0.5,
                  pathColor: '#d6d6d6',
                  textColor: '#d6d6d6',
                  backgroundColor: '#E0D2D0',
                })} >
                  <p style={{textAlign:"center", marginTop:"-27px", marginLeft:"20px", fontSize:"16px", color:"#d6d6d6"}}>{this.state.neutralPercentage}%</p>
                  </CircularProgressbarWithChildren></th>
              <th><CircularProgressbarWithChildren
                value={this.state.negativePercentage}
                //text={`${this.state.negativePercentage}%`}
                styles={buildStyles({
                  strokeLinecap: 'butt',
                  textSize: '8px',
                  pathTransitionDuration: 0.5,
                  pathColor: '#f88',
                  textColor: '#f88',
                  backgroundColor: '#E0D2D0',
                })} >
                  <p style={{textAlign:"center", marginTop:"-27px", marginLeft:"20px", fontSize:"16px", color:"#f88"}}>{this.state.negativePercentage}%</p>
                  </CircularProgressbarWithChildren></th>
            </tr>
            {/* <tr>
              <th>{this.state.positivePercentage}</th>
              <th>{this.state.neutralPercentage}</th>
              <th>{this.state.negativePercentage}</th>
            </tr> */}
          </table>):<div></div>}
        </div>
      </div>

    );
  }


}

export default withRouter(AudioInput);