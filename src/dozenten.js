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
        },
        fetchVorlesung: {
             "vorId": "",
             "vorName": "",
             "dozenten": {
                "dozId": "",
                "dozVorname": "",
                "dozNachname": "",
                "dozMail": "",
                "dozTel": "",
                "dozMobil": ""
             } 

        },
       }
        this.fetchDozent = this.fetchDozent.bind(this);
        this.fetchVorlesung = this.fetchVorlesung.bind(this);
    }
    componentDidMount(){
        this.fetchDozent();
        this.fetchVorlesung();
       
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
    fetchVorlesung() {
        axios.get('http://localhost:8080/vorlesungen/0')
        .then((response) => {
            // console.log("response", response);
            this.setState({
                fetchVorlesung: response.data
            });
            console.log("fetchVorlesung", this.state.fetchVorlesung);
            // console.log("dozenten", this.state.fetchDozent[1])
        })
        .catch((error) => {
            console.log(error);
        });
    }

    fetchDozentPost (event) {
        event.preventDefault();
    const formdata = new FormData(event.target);
    var object = {};
    formdata.forEach(function(value, key){
      object[key] = value;
    });
    var json = JSON.stringify(object);
    alert(json);
        fetch('http://localhost:8080/dozenten/',
        {  
            method: "POST",
            headers: {
            'Content-Type': 'application/json'
          },
            body: json}
    
    )
    .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      window.location.reload();
     }


    fetchVorlesungPost (event) {
        event.preventDefault();
    const formdata = new FormData(event.target);
    var object = {};
    formdata.forEach(function(value, key){
      object[key] = value;
    });
    var json = JSON.stringify(object);
    alert(json);
        
        fetch('http://localhost:8080/vorlesung/',
        {  
            method: "POST",
            headers: {
            'Content-Type': 'application/json'
          },
            body: json}
    
    )
    .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      window.location.reload();
     }
    
     

    
    render() {
        
        // if (this.fetchDozent.length != 0){
        let dozData = [];
        for (let i=0; i < this.state.fetchDozent.length; i++){
            dozData.push(<a key = {i} id={this.state.fetchDozent[i]["dozId"]} onClick={() =>document.getElementById("validationTooltip01").value = this.state.fetchDozent[i]["dozId"]} class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
           
              
              <h5 class="mb-1">{this.state.fetchDozent[i]["dozVorname"] +" "+this.state.fetchDozent[i]["dozNachname"] + " (ID: "+ this.state.fetchDozent[i]["dozId"]+")"}</h5>
              
            </div>
            <p class="mb-1">{this.state.fetchDozent[i]["dozMail"]}</p>
            <p class="mb-1">{this.state.fetchDozent[i]["dozTel"]}</p>
          </a>);  }  
        let vorData = [];
        for (let i=0; i < this.state.fetchVorlesung.length; i++){
            vorData.push(<a key = {i} class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
           
           
              <h5 class="mb-1">{this.state.fetchVorlesung[i]["vorName"]}</h5>
              
            </div>
            <p class="mb-1">{this.state.fetchVorlesung[i]["dozenten"]["dozVorname"] + " "+ this.state.fetchVorlesung[i]["dozenten"]["dozNachname"]}</p>
         
         </a>);
        
        } 
        
           

        
          

        
    
        return(
            
            <div>
                <div className="content" id="neuerdozent">
                <form class="needs-validation" onSubmit={this.fetchDozentPost} id="dozent">
                    
                    <h1 className="display-4">Neuer Dozent</h1>
                    <hr></hr>
                    <div class="form-row">
                        <div class="col-md-4 mb-3" id="col-md-4-mb-3">
                            <input type="text" class="form-control" id="validationTooltip02" placeholder="Vorname" name="dozVorname" required></input>
                        </div>
                        <div class="col-md-4 mb-3" id="col-md-4-mb-3">
                            <input type="text" class="form-control" id="validationTooltip02" placeholder="Nachname" name="dozNachname" required></input>
                        </div>
                        <div class="col-md-4 mb-3" id="col-md-4-mb-3">
                            <input type="text" class="form-control" id="validationTooltip02" placeholder="Benutzername" ></input>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-4 mb-3" id="col-md-4-mb-3">
                            <input type="text" class="form-control" id="validationTooltip02" placeholder="E-Mail" name="dozMail" required></input>
                        </div>
                        <div class="col-md-4 mb-3" id="col-md-4-mb-3">
                            <input type="text" class="form-control" id="validationTooltip02" placeholder="Telefon" name="dozTel" required></input>
                        </div>
                        <div class="col-md-4 mb-3" id="col-md-4-mb-3">
                            <input type="text" class="form-control" id="validationTooltip02" placeholder="Mobil" name="dozMobil" required></input>
                        </div>
                    </div>
                    <button class="btn btn-primary" id="anlegen" type="submit">Anlegen</button>
                    </form>
                    </div>
            <div className="content" id="neuevorlesung">
                <form class="needs-validation" enctype="application/json" onSubmit={this.fetchVorlesungPost} id="dozent">
                    
                    <h1 className="display-4">Neue Vorlesung</h1>
                    <hr></hr>
                    <div class="form-row">
                        <div class="col-md-4 mb-3" id="col-md-4-mb-3">
                            <input type="text" class="form-control" id="validationTooltip01" placeholder="ID des Dozenten" name="dozenten: dozId" required></input>
                        </div>
                        <div class="col-md-4 mb-3" id="col-md-4-mb-3">
                            <input type="text" class="form-control" id="validationTooltip02" placeholder="Name der Vorlesung" name="},'vorName" required></input>
                        </div>
                        
                    </div>
                   
                    <button class="btn btn-primary" id="anlegen" type="submit">Anlegen</button>
                    </form>
                    </div>
                    <div className="content" id="search">
                        <br></br>
                        <h1 className="display-4" id="dozÜberschrift">Dozenten<h1 className="display-4" id="vorÜberschrift">Vorlesungen</h1></h1>
                        
                        <hr></hr>
                        <div id="dozentenverzeichnis" class="list-group">{dozData}
                                </div>
                        <div id="vorlesungverzeichnis" class="list-group">{vorData}
                                </div>
                    </div>
                </div>
            
       
                );
                
            

        }
    }
    
    


export default Dozenten