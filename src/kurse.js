import React from 'react';
import './kurse.css';


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




class Kurse extends React.Component{
    //Later there will be a .js for each header in menu like Dozenten, Termine, etc.
    //These .js Files will have two different main components: One full and one shorter view
    //the export default will always be the shorter version
    //that way we're able to include them here in our home view but also seperate them.

    constructor(probs) {
        super(probs);
        this.handleSubmitKurs = this.handleSubmitKurs.bind(this);
        this.showKurse = this.showKurse.bind(this);
        this.showSemester = this.showSemester.bind(this);
        this.intoTermine = this.intoTermine;
        this.lookupTermineSemester = this.lookupTermineSemester.bind(this);
        this.checkbox = this.checkbox;
        this.deleteKurs = this.deleteKurs;
        this.deleteSemester = this.deleteSemester;
        this.getDays = this.getDays;
        this.state = {
            showKurse: {
                "kurId": "",
                "kurBezeichnung": ""
            },
            showSemester: {
                "semId": "",
                "sem_bez": "",
                "kurs": {
                "kurId": "",
                "kurBezeichnung": ""
            },
            lookupTermineSemester: {
                "terId": "",
                "terDatum": "",
                "terVonUhrzeit": "",
                "terBisUhrzeit": "",
                "raumNr": "",
                "verfügbar": "",
                "vorlesungen": {
                    "vorId": "",
                    "vorName": "",
                    "dozenten": {
                        "dozId": "",
                        "dozVorname": "",
                        "dozNachname": "",
                        "dozMail": "",
                        "dozTel": "",
                        "dozMobil": "",
                        "password": ""
                    }
                },
                "semester": {
                    "semId": "",
                    "sem_bez": "",
                    "kurs": {
                        "kurId": "",
                        "kurBezeichnung": ""
                    }
                }
            },
            date: undefined
                
            }
        };
    }
    
    handleSubmitKurs(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        var object = {};
        data.forEach(function(value, key){
            object[key] = value;
        });
       
        var json = JSON.stringify(object);
        fetch('https://vorlesungsplaner.herokuapp.com/kurs', {
            method: 'POST',
            //   mode: 'no-cors',
            //   cache: 'no-cache',
            //   credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getCookie("token")

            },
            body: json
        })
        .then((res) => {
            if(res.ok){
                document.getElementsByName('Kursform')[0].reset();
                console.log("Kurs wurde erfolgreich angelegt.")
                document.getElementById("show-header").click();
                document.getElementById("show-header").click();
            }
        })
        .catch((err) => {
            console.log(err);
        });
        
    }

    

    handleSubmitSemester(event){
        event.preventDefault();
        const data = new FormData(event.target);
        var object = {};
        data.forEach(function(value, key){
            object[key] = value;
        });
        if(object["kurId"] != ""){
            var err = document.getElementById("semHinErr");
            if(err){
                err.parentNode.removeChild(err);
            }

            var KurIdArray = {};
            KurIdArray["kurId"] = object["kurId"];
            var jsonArray = {};
            jsonArray["sem_bez"] = object["sem_bez"];
            jsonArray["kurs"] =  KurIdArray;
            var json = JSON.stringify(jsonArray);

            fetch('https://vorlesungsplaner.herokuapp.com/semester', {
                method: 'POST',
                //   mode: 'no-cors',
                //   cache: 'no-cache',
                //   credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getCookie("token")
    
                },
                body: json
            })
            .then((res) => {
                if(res.ok){
                    document.getElementsByName('Semesterform')[0].reset();
                    console.log("Semester wurde erfolgreich dem Kurs hinzugefügt.");
                    document.getElementById("show-header").click();
                    document.getElementById("show-header").click();
                }
            })
            .catch((err) => {
                console.log(err);
            });
            

        } else {
            var err = document.getElementById("semHinErr");
            if(err){
            } else{
                var error = document.createElement("div");
                error.className = "alert alert-danger";
                error.id = "semHinErr"
                error.role = "alert";
                error.innerHTML = 'Fehler: Bitte zuerst den dazugehörigen Kurs auswählen.';
                document.getElementById("mainKurse").insertBefore(error, document.getElementById("show"));
            }
          
            
        }
        
    }

    showKurse(){  
        if(document.getElementById("show-main")){
                        
            var zitat = document.getElementById("zitat");
            document.getElementById("message").removeChild(zitat);
            var zitatneu = document.createElement("cite");
            zitatneu.id = "zitat";
            zitatneu.innerHTML = "Klicken, um Elemente anzeigen zu lassen";
            document.getElementById("message").appendChild(zitatneu);
            var element = document.getElementById("show-main");
            document.getElementById("show").removeChild(element);
            document.getElementsByName('Kursform')[0].reset();

        } else{
            
            var zitat = document.getElementById("zitat");
            document.getElementById("message").removeChild(zitat);
            var zitatneu = document.createElement("cite");
            zitatneu.id = "zitat";
            zitatneu.innerHTML = "Klicken, um Elemente zu verstecken<hr />";
            document.getElementById("message").appendChild(zitatneu);
            var showmain = document.createElement("div");
            showmain.id = "show-main"
            document.getElementById("show").appendChild(showmain);
            

            
            fetch("https://vorlesungsplaner.herokuapp.com/kurs/0", {
                "method": "GET",
                "headers": {
                    "authorization": "Bearer " + getCookie("token")
                }
            })
            .then(dataWrappedByPromise => dataWrappedByPromise.json())
            .then((response) => {
                

                this.setState({
                    showKurse: response
                });

                
                for (let i=0; i < this.state.showKurse.length; i++){
                    var kursElement = document.createElement("div");
                    kursElement.className = "kurs";
                    kursElement.id = this.state.showKurse[i]["kurId"];
                    kursElement.onclick = () => this.showSemester(this.state.showKurse[i]["kurBezeichnung"],this.state.showKurse[i]["kurId"]);
                    kursElement.innerHTML = this.state.showKurse[i]["kurBezeichnung"];
                    var checkElement = document.createElement("div");
                    checkElement.className = "check";
                    var checkdiv = document.createElement("div");
                    checkdiv.className = "custom-control custom-checkbox";
                    var checkinput = document.createElement("input");
                    checkinput.type = "checkbox";
                    checkinput.className = "custom-control-input";
                    checkinput.id = this.state.showKurse[i]["kurId"] +'check';
                    // checkinput.onclick = () => this.checkbox(this.state.showKurse[i]["kurId"]);
                    var checklabel = document.createElement("label");
                    checklabel.className = "custom-control-label";
                    checklabel.setAttribute("for", this.state.showKurse[i]["kurId"] +'check');
                    // checklabel.for = this.state.showKurse[i]["kurId"] +'check';
                    checklabel.onclick = () => this.checkbox(this.state.showKurse[i]["kurId"]);
                    checkdiv.appendChild(checkinput);
                    checkElement.appendChild(checkdiv);
                    checkdiv.appendChild(checklabel);
                    // checkdiv.innerHTML += '<label class="custom-control-label" for="'+ this.state.showKurse[i]["kurId"] +'check"></label>';
                    var trashElement = document.createElement("div");
                    trashElement.className = "trash";
                    trashElement.innerHTML = '<svg class="bi bi-trash2-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M2.037 3.225l1.684 10.104A2 2 0 005.694 15h4.612a2 2 0 001.973-1.671l1.684-10.104C13.627 4.224 11.085 5 8 5c-3.086 0-5.627-.776-5.963-1.775z"/><path fill-rule="evenodd" d="M12.9 3c-.18-.14-.497-.307-.974-.466C10.967 2.214 9.58 2 8 2s-2.968.215-3.926.534c-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466zM8 5c3.314 0 6-.895 6-2s-2.686-2-6-2-6 .895-6 2 2.686 2 6 2z" clip-rule="evenodd"/></svg>';
                    trashElement.onclick= () => this.deleteKurs(this.state.showKurse[i]["kurId"]);                    
                    var frameofKurs = document.createElement("div");
                    frameofKurs.className = "d-flex justify-content-center";
                    frameofKurs.appendChild(checkElement);
                    frameofKurs.appendChild(kursElement);
                    frameofKurs.appendChild(trashElement);
                    showmain.appendChild(frameofKurs);
                    
                }  
            })
            .catch((err) => {
                console.log(err);
            })
            
            
        
        }
        
        
    }

    deleteKurs(kursId){
        var errDiv = document.getElementById("kurDelErr");
        fetch("https://vorlesungsplaner.herokuapp.com/kurs/" + kursId, {
            "method": "DELETE",
            "headers": {
                "Authorization": "Bearer " + getCookie("token")
            }
        })
        .then(res => {
            if(res.ok){
                if(errDiv){
                    document.getElementById("mainKurse").removeChild(errDiv);
                    
                    
                }  
                document.getElementById("show-header").click();
                document.getElementById("show-header").click();      
            } else {
                if(errDiv){
                } else{
                    var error = document.createElement("div");
                    error.className = "alert alert-danger";
                    error.id = "kurDelErr"
                    error.role = "alert";
                    error.innerHTML = 'Kurs kann nicht gelöscht werden, bitte Semester entfernen.';
                    document.getElementById("mainKurse").insertBefore(error, document.getElementById("show"));
                }
            }
        })
        .catch(err => {
            if(err){
                if(errDiv){
                } else{
                    var error = document.createElement("div");
                    error.className = "alert alert-danger";
                    error.id = "kurDelErr"
                    error.role = "alert";
                    error.innerHTML = 'Kurs kann nicht gelöscht werden, bitte Semester entfernen.';
                    document.getElementById("mainKurse").insertBefore(error, document.getElementById("show"));
                }
            }
            
        });
        
        
    }

    showSemester(kursName,kursId){
        //Kurs in Inputfeld eintragen
        document.getElementById("inputAddKurs").value = kursName;

        
        // document.getElementById(kursId).style.color = "#E30013";

        //Mit kursId nach Semester des Kurses suchen
        if(document.getElementById(kursId).parentNode.nextSibling == null || document.getElementById(kursId).parentNode.nextSibling.id != "semesterRahmen"){
            var semRahmen = document.createElement("div");
            semRahmen.id = "semesterRahmen";
            // semRahmen.appendChild(document.createElement("hr"));

            fetch("https://vorlesungsplaner.herokuapp.com/semester/0", {
                "method": "GET",
                "headers": {
                    "authorization": "Bearer " + getCookie("token")
                }
            })
            .then(dataWrappedByPromise => dataWrappedByPromise.json())
            .then((response) => {
                

                this.setState({
                    showSemester: response
                });
                

                
                for (let i=0; i < this.state.showSemester.length; i++){
                    if(this.state.showSemester[i]["kurs"]["kurId"] == kursId){


                        var semElement = document.createElement("div");
                        semElement.className = "semester";
                        //semElement.id = this.state.showSemester[i]["semId"];
                        semElement.onclick = () => this.intoTermine(kursName, this.state.showSemester[i]["semId"]); 
                        semElement.innerHTML = this.state.showSemester[i]["sem_bez"];
                        
                        var frameofSemester = document.createElement("div");
                        frameofSemester.className = "d-flex justify-content-center";
                        frameofSemester.id = this.state.showSemester[i]["semId"];

                        var trashElement = document.createElement("div");
                        trashElement.className = "trash";
                        trashElement.innerHTML = '<svg class="bi bi-trash2-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M2.037 3.225l1.684 10.104A2 2 0 005.694 15h4.612a2 2 0 001.973-1.671l1.684-10.104C13.627 4.224 11.085 5 8 5c-3.086 0-5.627-.776-5.963-1.775z"/><path fill-rule="evenodd" d="M12.9 3c-.18-.14-.497-.307-.974-.466C10.967 2.214 9.58 2 8 2s-2.968.215-3.926.534c-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466zM8 5c3.314 0 6-.895 6-2s-2.686-2-6-2-6 .895-6 2 2.686 2 6 2z" clip-rule="evenodd"/></svg>';
                        trashElement.onclick = () => this.deleteSemester(this.state.showSemester[i]["semId"],kursId);

                        var leftstatic = document.createElement("div");
                        leftstatic.className = "fuellelement";
                        frameofSemester.appendChild(leftstatic);
                        frameofSemester.appendChild(semElement);
                        frameofSemester.appendChild(trashElement);
                        
                        
                        semRahmen.appendChild(frameofSemester);
                    }
                    
                }  
            })
            .then(() => {            
                document.getElementById(kursId).parentNode.parentNode.insertBefore(semRahmen, document.getElementById(kursId).parentNode.nextSibling);
            })
            .catch((err) => {
                console.log(err);
            })
        } else{
            document.getElementById("inputAddKurs").value = "";
            document.getElementById(kursId).style.color = "";
            while (document.getElementById(kursId).parentNode.nextSibling !=null && document.getElementById(kursId).parentNode.nextSibling.id == "semesterRahmen") {
                document.getElementById(kursId).parentNode.parentNode.removeChild(document.getElementById(kursId).parentNode.nextSibling);
              }
        }
    }

    checkbox(kursId){
        // function uncheckAll(divid) {
        //     var checks = document.querySelectorAll('#' + divid + ' input[type="checkbox"]');
        //     for(var i =0; i< checks.length;i++){
        //         var check = checks[i];
        //         if(!check.disabled){
        //             check.checked = false;
        //         }
        //     }
        //     document.getElementById(kursId+"check").disabled= false;
        // }
        // uncheckAll("show-main");
        var ram = document.getElementById("inputAddIdKurs").value;
        if(ram != "" && ram != kursId){
            document.getElementById(ram + "check").checked = false;
        }
        
        document.getElementById("inputAddIdKurs").value = kursId;
         
    }

    deleteSemester(semId,kursId){
        var errDiv = document.getElementById("semDelErr");
        var kurs = document.getElementById(kursId);
        fetch("https://vorlesungsplaner.herokuapp.com/semester/" + semId, {
            "method": "DELETE",
            "headers": {
                "Authorization": "Bearer " + getCookie("token")
            }
        })
        .then(res => {
            if(res.ok){
                if(errDiv){
                    document.getElementById("mainKurse").removeChild(errDiv);
                    
                } 
                kurs.click();
                kurs.click();    
            } else {
                if(errDiv){
                } else{
                    var error = document.createElement("div");
                    error.className = "alert alert-danger";
                    error.id = "semDelErr"
                    error.role = "alert";
                    error.innerHTML = 'Semester kann nicht gelöscht werden, enthält Termine.';
                    document.getElementById("mainKurse").insertBefore(error, document.getElementById("show"));
                }
            }
        });
    }

    intoTermine(kursName, semName){
        document.getElementById("inputKurs").value = kursName;
        document.getElementById("inputSemester").value = semName;
    }

    lookupTermineSemester(event){
        event.preventDefault();
        const data = new FormData(event.target);
        var object = {};
        data.forEach(function(value, key){
            object[key] = value;
        });
        //Anfrage mit IDs ans Backend schicken, an "Termine" anhängen

        fetch("https://vorlesungsplaner.herokuapp.com/termine/semid/" + object["semid"], {
            "method": "GET",
            "headers": {
                "Authorization": "Bearer " + getCookie("token")
            }
        })
        .then(dataWrappedByPromise => dataWrappedByPromise.json())
        .then(res => {
        
            
            this.setState({
                lookupTermineSemester: res
            });
            if(document.getElementById("zitatTermine")){
                document.getElementById("zitatTermine").parentNode.removeChild(document.getElementById("zitatTermine"));
            }
            
            
            //Startmonat der Termine festlegen
            for (let i=0; i < this.state.lookupTermineSemester.length; i++){
                var date = new Date(this.state.lookupTermineSemester[i]["terDatum"]);
                if(this.state.date == undefined || this.state.date > date){
                    this.state.date = date;
                }
                
                
            }
            
            var days = this.getDays(this.state.date.getMonth() + 1,this.state.date.getFullYear());
            
            var kalender = document.createElement("div");
            kalender.id="kalender";
            kalender.className="d-flex flex-wrap";
            
            // semElement.onclick = () => this.intoTermine(kursName, this.state.showSemester[i]["semId"]); 
            for (let i=1; i <= days; i++){
                var day = document.createElement("div");
                day.className="day";
                day.id=this.state.date;
                day.innerHTML= i;//Datum
                if(this.state.lookupTermineSemester[i]["terId"]){
                    //Termin exisitert, Daten müssen eingetragen werden
                    var termin = document.createElement("div");
                    
                } else {
                    day.onclick = () => this.addTermin();
                }
                
                if(this.state.lookupTermineSemester[i]["terDatum"] === this.state.lookupTermineSemester[i+1]["terDatum"]){
                    
                }

                
            }
            document.getElementById("contentTermine").appendChild(kalender);
        })
        .catch(err => {
        });

    }

    getDays(month, year) {
        return new Date(year, month, 0).getDate();
    }
    

    render() {


        
        return(
            <div id="mainKurse">
                <div id="add">
                    <form onSubmit={this.handleSubmitKurs} id="kurs" name="Kursform">
                        <div className="inputfields">
                            <div className="form-row">
                                <div className="input-group" id="inp-g">
                                    <div className="input-group-prepend" id="inp" >
                                        <button className="input-group-text" id="inputGroupPrepend2" type="submit">
                                            +
                                        </button>
                                    </div>
                                    <input id="inputAddKurs" type="text" className="form-control" name="kurBezeichnung" placeholder="Kurs" required />
                                </div>
                            </div>
                        </div>
                    </form>
                    <form onSubmit={this.handleSubmitSemester} id="semester" name="Semesterform">
                        <div className="inputfields">
                            <div className="form-row">
                                <div className="input-group" id="inp-g">
                                    <div className="input-group-prepend" id="inp">
                                        <button className="input-group-text" id="inputGroupPrepend2" type="submit">
                                            +
                                        </button>
                                    </div>
                                    <input id="inputAddIdKurs" type="text" className="form-control" name="kurId" />
                                    <input id="inputAddSemester" type="text" className="form-control" name="sem_bez" placeholder="Semester" required />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="content" id="show">
                    <div id="show-header" onClick={this.showKurse}>
                        <h1 className="display-4">Kurse</h1>
                        <div id="message">
                            <cite id="zitat">Klicken, um Elemente anzeigen zu lassen</cite>
                        </div>
                        
                        
                    </div>
                    
                    
                    
                   
                          
                </div>
                
                <div className="content" id="contentTermine" >
                    <h1 className="display-4">Termine</h1>
                    <hr></hr>
                    <form onSubmit={this.lookupTermineSemester}>
                        <div className="row">
                            <div className="col" id="searchKurs">
                                <input type="text" className="form-control" name="kurs" placeholder="Kurs" id="inputKurs" required/>
                            </div>
                            <div className="col" id="searchSemester">
                                <input type="text" className="form-control" name="semid" placeholder="ID" id="inputSemester" required/>
                                <button type="submit" className="btn btn-primary mb-2" id="termine-search">
                                    <svg className="bi bi-search" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clip-rule="evenodd"/>
                                        <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clip-rule="evenodd"/>
                                    </svg>
                                </button>
                            </div>
                            
                            
                        </div>
                        
                    </form>
                    <div id="zitatTermine">
                        <cite>Auf das gewünschte Semester klicken, um ID zu erhalten</cite>
                    </div>
                    <div id="kalenderbar" class="d-flex justify-content-center">
                        <svg class="bi bi-chevron-compact-left" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M9.224 1.553a.5.5 0 01.223.67L6.56 8l2.888 5.776a.5.5 0 11-.894.448l-3-6a.5.5 0 010-.448l3-6a.5.5 0 01.67-.223z" clip-rule="evenodd"/>
                        </svg>
                        <h2 className="display-4" id="mon">April</h2>
                        <svg class="bi bi-chevron-compact-right" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M6.776 1.553a.5.5 0 01.671.223l3 6a.5.5 0 010 .448l-3 6a.5.5 0 11-.894-.448L9.44 8 6.553 2.224a.5.5 0 01.223-.671z" clip-rule="evenodd"/>
                        </svg>
                    </div>
                    <div id="kalender" class="d-flex flex-wrap">
                        <div class="day">
                            <div class="num">1</div>
                            <div class="termin">
                                9:00 - 11:30<br/>
                                Bumsen<br/>
                                Prof. Dr. leckmichamArsch
                            </div>
                            <div class="termin">
                                9:00 - 11:30<br/>
                                Bumsen<br/>
                                Prof. Dr. leckmichamArsch
                            </div>
                        </div>
                        <div class="day">
                            <div class="num">2</div>
                            <div class="termin">
                                9:00 - 11:30<br/>
                                Bumsen<br/>
                                Prof. Dr. leckmichamArsch
                            </div>
                            <div class="termin">
                                9:00 - 11:30<br/>
                                Bumsen<br/>
                                Prof. Dr. leckmichamArsch
                            </div>
                        </div>
                        <div class="day">
                            <div class="num">3</div>
                            <div class="termin">
                                9:00 - 11:30<br/>
                                Bumsen<br/>
                                Prof. Dr. leckmichamArsch
                            </div>
                            <div class="addTermin">
                                <svg class="bi bi-plus-circle" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/>
                                    <path fill-rule="evenodd" d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z" clip-rule="evenodd"/>
                                    <path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                        </div>
                        <div class="day">
                            <div class="num">4</div>
                            <div class="termin">
                                9:00 - 11:30<br/>
                                Bumsen<br/>
                                Prof. Dr. leckmichamArsch
                            </div>
                            <div class="termin">
                                9:00 - 11:30<br/>
                                Bumsen<br/>
                                Prof. Dr. leckmichamArsch
                            </div>
                        </div>
                        <div class="day">
                            <div class="num">5</div>
                            <div class="termin">
                                9:00 - 11:30<br/>
                                Bumsen<br/>
                                Prof. Dr. leckmichamArsch
                            </div>
                            <div class="termin">
                                9:00 - 11:30<br/>
                                Bumsen<br/>
                                Prof. Dr. leckmichamArsch
                            </div>
                        </div>
                        <div class="day">
                            <div class="num">6</div>
                            <div class="addTermin">
                                <svg class="bi bi-plus-circle" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/>
                                    <path fill-rule="evenodd" d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z" clip-rule="evenodd"/>
                                    <path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                        </div>
                        <div class="day">
                            <div class="num">7</div>
                            <div class="termin">
                                9:00 - 11:30<br/>
                                Bumsen<br/>
                                Prof. Dr. leckmichamArsch
                            </div>
                            <div class="termin">
                                9:00 - 11:30<br/>
                                Bumsen<br/>
                                Prof. Dr. leckmichamArsch
                            </div>
                        </div>
                        <div class="day">
                            <div class="num">8</div>
                            <div class="termin">
                                9:00 - 11:30<br/>
                                Bumsen<br/>
                                Prof. Dr. leckmichamArsch
                            </div>
                            <div class="termin">
                                9:00 - 11:30<br/>
                                Bumsen<br/>
                                Prof. Dr. leckmichamArsch
                            </div>
                        </div>
                        <div class="day" id="nextMon">
                            <div class="num">1</div>
                            <div class="termin">
                                9:00 - 11:30<br/>
                                Bumsen<br/>
                                Prof. Dr. leckmichamArsch
                            </div>
                            <div class="termin">
                                9:00 - 11:30<br/>
                                Bumsen<br/>
                                Prof. Dr. leckmichamArsch
                            </div>
                        </div>
                        <div class="day" id="nextMon">
                            <div class="num">2</div>
                            <div class="termin">
                                9:00 - 11:30<br/>
                                Bumsen<br/>
                                Prof. Dr. leckmichamArsch
                            </div>
                            <div class="termin">
                                9:00 - 11:30<br/>
                                Bumsen<br/>
                                Prof. Dr. leckmichamArsch
                            </div>
                        </div>
                    </div>
                   
                          
                </div>
                
            </div>

        );
        
    }

}


export default Kurse;