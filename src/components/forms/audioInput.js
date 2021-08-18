import React,{Component} from 'react';
import firebase from '../../firebase';
import { CircularProgressbar, 
  CircularProgressbarWithChildren,
  buildStyles } from 'react-circular-progressbar';
import { withRouter } from 'react-router';

var storageRef = firebase.storage().ref();
const positivePercentage = 66; 
const negativePercentage = 14;
const neutralPercentage = 20;
const u = JSON.parse(localStorage.getItem("user"));

const toBlob = (file) => {
  return new Blob([file],{
    type: 'audio/wav'
  })
}

class AudioInput extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      selectedFile: null
    }
  };
    
    onFileChange = event => {
      this.setState({ selectedFile: event.target.files[0] });
    
    };
    onFileUpload = async () => {
      const formData = new FormData();
      if(this.state.selectedFile==null){
        alert("No file Selected for upload!!!!");
      }
      else{
        formData.append(
          "myFile",
          this.state.selectedFile,
          this.state.selectedFile.name
        );
        console.log(this.state.selectedFile);
        // axios.post("api/uploadfile", formData);
        try{
          const blob = toBlob(this.state.selectedFile);
          console.log(blob);
          var mountainsRef = storageRef.child(this.state.selectedFile.name);
          await mountainsRef.put(blob);
          const res = await mountainsRef.getDownloadURL();
          fetch('http://localhost:3001/api/process_audio',{
          method:'post',
          headers:{'Content-type':'application/json'},
          body:JSON.stringify({
            email: u.email,
            link: res,
          })
      })
          .then(response=>response.json())
          
        }catch(err){
          console.log(err)
        }
      }
      
    };
    fileData = () => {
    
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
                <input  type="file" onChange={this.onFileChange} className = "audioInputFile" />
                <button style={{backgroundColor:'#68b9ec'}} onClick={this.onFileUpload} className = "uploadButton">
                  Upload!
                </button>
            </div>
          {this.fileData()}
          <div>
            <table className = "reportTable">
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
            </table>
          </div>
        </div>

      );
    }
    

  }
 
  export default withRouter(AudioInput);