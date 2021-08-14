import axios from 'axios';
import React,{Component} from 'react';
import firebase from '../../firebase';

var storageRef = firebase.storage().ref();

class AudioInput extends Component {
  
    state = {
      selectedFile: null
    };
    onFileChange = event => {
      this.setState({ selectedFile: event.target.files[0] });
    
    };
    onFileUpload = async () => {
      const formData = new FormData();
      formData.append(
        "myFile",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      console.log(this.state.selectedFile);
      // axios.post("api/uploadfile", formData);
      try{
        var mountainsRef = storageRef.child(this.state.selectedFile.name);
        await mountainsRef.put({...this.state.selectedFile});
        const res = await mountainsRef.getDownloadURL();
        console.log(res);
      }catch(err){
        console.log(err)
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
            <h3>
              File Upload using React!
            </h3>
            <div>
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>
                  Upload!
                </button>
            </div>
          {this.fileData()}
        </div>
      );
    }
  }
 
  export default AudioInput;