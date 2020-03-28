import React from 'react';
import './dozenten.css';
import axios from 'axios';



class Dozenten extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            fetchDozent: {
            "dozId": "",
            "dozVorname": "",
            "dozNachname": "",
            "dozMail": "",
            "dozTel": "",
            "dozMobil": ""       
        }
    }
        this.fetchDozent = this.fetchDozent.bind(this);
    }
    componentDidMount(){
        this.fetchDozent();
      }
     fetchDozent() {
        axios.get('http://localhost:8080/dozenten/0')
        .then((response) => {
            // console.log("response", response);
            this.setState({
                fetchDozent: response.data
            });
            console.log("fetchDozent", this.state.fetchDozent);
            // console.log("dozenten", this.state.fetchDozent[1])
        })
        .catch((error) => {
            console.log(error);
        });
    }
    fetchDozentPost () {
        axios.post('http://localhost:8080/dozenten/',
        {"dozVorname": "",
        "dozNachname": "",
        "dozMail": "",
        "dozTel": "",
        "dozMobil": ""
    })
    .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
    render() {
        
        // if (this.fetchDozent.length != 0){
        let dozData = [];
        for (let i=0; i < this.state.fetchDozent.length; i++){
            dozData.push(
            <a key = {i} href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">                
                    <h5 className="mb-1">{this.state.fetchDozent[i]["dozVorname"] +" "+this.state.fetchDozent[i]["dozNachname"] + " (ID: "+ this.state.fetchDozent[i]["dozId"]+")"}</h5>                
                </div>
                <p className="mb-1">{this.state.fetchDozent[i]["dozMail"]}</p>
                <p className="mb-1">{this.state.fetchDozent[i]["dozTel"]}</p>
            </a>
            ) 
        }      

        //   console.log("dozData", dozData);
          

        
    
        return(
            <div>
                <div id="add">
                    <form onSubmit={this.fetchDozentPost} id="dozent">
                        <div className="inputfields">
                            <div className="form-row">
                                <div className="input-group" id="inp-g">
                                    <div className="input-group-prepend" id="inp">
                                        <span className="input-group-text" id="inputGroupPrepend2" onClick={this.fetchDozentPost}>
                                            +
                                        </span>
                                        
                                    </div>
                                    
                                    <input id="doz" type="text" className="form-control" name="addDozent" placeholder="Dozent" required />
                                    <input id="vorl" type="text" className="form-control" name="addVorlesung" placeholder="Vorlesung" required />
                    
                                    
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="content" id="search">
                    <h1 className="display-4">Dozentenverzeichnis</h1>
                    <hr></hr>
                    <form>
                        <div className="row">
                            <div className="col" id="searchDozent">
                                <input type="text" className="form-control" name="dozent" placeholder="Dozent" id="inputDozent" />
                            </div>
                            <div className="col" id="searchVorlesung">
                                < input type="text" className="form-control" name="vorlesung" placeholder="Vorlesung" id="inputVorlesung" />
                            </div>
                        </div>
                    </form>
                    
                    
                    <div id="dozentenverzeichnis" className="list-group"> {dozData}
                    </div>
                </div>
                <button onClick={this.fetchDozent}></button>
            </div>
        );
        
    }
    
}



export default Dozenten;