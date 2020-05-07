import React from 'react';
import './dozenten.css';
import axios from 'axios';

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}



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
            "dozMobil": "",
                
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
        axios.get('https://vorlesungsplaner.herokuapp.com/dozenten/0', {
            headers: {
                "Authorization": "Bearer " + getCookie("token")
            }})
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
        axios.get('https://vorlesungsplaner.herokuapp.com/vorlesungen/0', {
            headers: {
                "Authorization": "Bearer " + getCookie("token")
            }})
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
        fetch('https://vorlesungsplaner.herokuapp.com/dozenten/register',
        {  
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + getCookie("token")
          },
            body: json}
    
    )
    .then(function (response) {
        if(response.ok){
            window.location.reload();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      //window.location.reload();
     }


    fetchVorlesungPost (event) {
        event.preventDefault();
    const formdata = new FormData(event.target);
    var object = {};
    formdata.forEach(function(value, key) {
        object[key] = value
    });
    

    var KurIdArray = {};
    KurIdArray["dozId"] = object["dozId"];
    var jsonArray = {};
    jsonArray["vorName"] = object["vorName"];
    jsonArray["dozenten"] =  KurIdArray;
    var json = JSON.stringify(jsonArray);
    //alert(json);

    // 
   
        fetch('https://vorlesungsplaner.herokuapp.com/vorlesungen/',
        {  
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + getCookie("token")
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
    
    deleteDozent(dozId) {
        fetch('https://vorlesungsplaner.herokuapp.com/dozenten/'+dozId,
        {  
            method: "DELETE",
            headers: {
            "Authorization": "Bearer " + getCookie("token")
          }}
            
    
    )
    .then(res =>{
        var errDiv =  document.getElementById("errDoz").childNodes;
        if(res.ok){
            window.location.reload(); 
        } else {
            if(errDiv.length != 0){
            } else{
                var error = document.createElement("div");
                error.className = "alert alert-danger";
                error.id = "dozDelErr"
                error.role = "alert";
                error.innerHTML = 'Es existieren Vorlesungen mit diesem Dozent.';
                document.getElementById("errDoz").appendChild(error);
            }
        }
                
      })
      .catch(function (error) {
        console.log(error);
      });
      
     
        

    }
    deleteVorlesung(vorId) {
        fetch('https://vorlesungsplaner.herokuapp.com/vorlesungen/'+vorId,
        {  
            method: "DELETE",
            headers: {
            "Authorization": "Bearer " + getCookie("token")
          }}
            
    
    )
    .then(res => {
        var errDiv =  document.getElementById("errVor").childNodes;
        if(res.ok){
            window.location.reload(); 
        } else {
            if(errDiv.length != 0){
            } else{
                var error = document.createElement("div");
                error.className = "alert alert-danger";
                error.id = "vorDelErr"
                error.role = "alert";
                error.innerHTML = 'Vorlesung kann nicht gelöscht werden, es existiert ein Termin mit dieser.';
                document.getElementById("errVor").appendChild(error);
            }
        }
                
      })
      .catch(function (error) {
        console.log(error);
      });
     
        

    }

    
    render() {
        
        // if (this.fetchDozent.length != 0){
        let dozData = [];
        for (let i=0; i < this.state.fetchDozent.length; i++){
            dozData.push(<a key = {i} id={this.state.fetchDozent[i]["dozId"]} onClick={() =>document.getElementById("validationTooltip01").value = this.state.fetchDozent[i]["dozId"]} className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
           
              
              <h5 className="mb-1">{this.state.fetchDozent[i]["dozVorname"] +" "+this.state.fetchDozent[i]["dozNachname"] + " (ID: "+ this.state.fetchDozent[i]["dozId"]+")"}</h5>
              <div className="trash2" onClick = {() => this.deleteDozent(this.state.fetchDozent[i]["dozId"])}>
              <svg class="bi bi-trash2-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M2.037 3.225l1.684 10.104A2 2 0 005.694 15h4.612a2 2 0 001.973-1.671l1.684-10.104C13.627 4.224 11.085 5 8 5c-3.086 0-5.627-.776-5.963-1.775z"/><path fill-rule="evenodd" d="M12.9 3c-.18-.14-.497-.307-.974-.466C10.967 2.214 9.58 2 8 2s-2.968.215-3.926.534c-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466zM8 5c3.314 0 6-.895 6-2s-2.686-2-6-2-6 .895-6 2 2.686 2 6 2z" clip-rule="evenodd"/></svg>
          </div>
            </div>
            <p className="mb-1">{this.state.fetchDozent[i]["dozMail"]}</p>
            <p className="mb-1">{this.state.fetchDozent[i]["dozTel"]}</p>
            
          </a>
         );  }  
        let vorData = [];
        for (let i=0; i < this.state.fetchVorlesung.length; i++){
            vorData.push(<a key = {i} className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
           
           
              <h5 className="mb-1">{this.state.fetchVorlesung[i]["vorName"] + " (ID: "+ this.state.fetchVorlesung[i]["vorId"]+")"}</h5>
              <div className="trash2" onClick = {() => this.deleteVorlesung(this.state.fetchVorlesung[i]["vorId"])}>
              <svg class="bi bi-trash2-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M2.037 3.225l1.684 10.104A2 2 0 005.694 15h4.612a2 2 0 001.973-1.671l1.684-10.104C13.627 4.224 11.085 5 8 5c-3.086 0-5.627-.776-5.963-1.775z"/><path fill-rule="evenodd" d="M12.9 3c-.18-.14-.497-.307-.974-.466C10.967 2.214 9.58 2 8 2s-2.968.215-3.926.534c-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466zM8 5c3.314 0 6-.895 6-2s-2.686-2-6-2-6 .895-6 2 2.686 2 6 2z" clip-rule="evenodd"/></svg>
          </div>
            </div>
            <p className="mb-1">{this.state.fetchVorlesung[i]["dozenten"]["dozVorname"] + " "+ this.state.fetchVorlesung[i]["dozenten"]["dozNachname"]}</p>
         
         </a>);
        
        } 
        
           

        
          

        
    
        return(
            
            <div>
                <div className="content" id="neuerdozent">
                <form className="needs-validation" onSubmit={this.fetchDozentPost} id="dozent">
                    
                    <h1 className="display-4">Neuer Dozent</h1>
                    <hr></hr>
                    <div className="form-row">
                        <div className="col-md-4 mb-3" id="col-md-4-mb-3">
                            <input type="text" className="form-control" id="validationTooltip02" placeholder="Vorname" name="dozVorname" required></input>
                        </div>
                        <div className="col-md-4 mb-3" id="col-md-4-mb-3">
                            <input type="text" className="form-control" id="validationTooltip02" placeholder="Nachname" name="dozNachname" required></input>
                        </div>
                        <div className="col-md-4 mb-3" id="col-md-4-mb-3">
                            <input type="text" className="form-control" id="validationTooltip02" placeholder="Passwort" name="password" required ></input>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-4 mb-3" id="col-md-4-mb-3">
                            <input type="text" className="form-control" id="validationTooltip02" placeholder="E-Mail" name="dozMail" required></input>
                        </div>
                        <div className="col-md-4 mb-3" id="col-md-4-mb-3">
                            <input type="text" className="form-control" id="validationTooltip02" placeholder="Telefon" name="dozTel" required></input>
                        </div>
                        <div className="col-md-4 mb-3" id="col-md-4-mb-3">
                            <input type="text" className="form-control" id="validationTooltip02" placeholder="Mobil" name="dozMobil" required></input>
                        </div>
                    </div>
                    <button className="btn btn-danger" id="anlegen" type="submit">Anlegen</button>
                    </form>
                    </div>
            <div className="content">
                <form className="needs-validation" encType="application/json" onSubmit={this.fetchVorlesungPost} id="dozent">
                    <br></br>
                    <h1 className="display-4">Neue Vorlesung</h1>
                    <hr></hr>
                    <div className="form-row" id="form-row2">
                        <div className="col" id="col-md-4-mb-3">
                            <input type="text" className="form-control" id="validationTooltip01" placeholder="ID des Dozenten" name="dozId" required></input>
                        </div>
                        <div className="col" id="col-md-4-mb-3">
                            <input type="text" className="form-control" id="validationTooltip02" placeholder="Name der Vorlesung" name="vorName" required></input>
                        </div>
                        
                    </div>
                   
                    <div id="anlegen">
                    <button className="btn btn-danger" id="anlegen" type="submit">Anlegen</button></div>
                    </form>
                    </div>
                    <div id="errDoz">

                    </div>
                    <div className="content">
                        <br></br>
                        <div className="center">
                            <h1 className="display-4">Dozenten</h1>
                        </div>
                        
                        
                        <hr></hr>
                        <div id="dozentenverzeichnis" className="list-group">{dozData}
                                </div>
                    </div>
                    <div id="errVor">

                    </div>
                    <div className="contentEnde">
                        <br></br>
                        <div className="center">
                            <h1 className="center display-4">Vorlesungen</h1>
                        </div>
                        
                        
                        <hr></hr>
                        <div id="vorlesungverzeichnis" className="list-group">{vorData}
                                </div>
                    </div>
                </div>
            
       
                );
                
            

        }
    }
    
    


export default Dozenten