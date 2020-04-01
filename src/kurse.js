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
        this.checkbox = this.checkbox;
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
                }
                
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
        fetch('/kurs', {
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

            fetch('/semester', {
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
            

            
            fetch("/kurs/0", {
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
                    checkElement.className = "check"
                    var checkdiv = document.createElement("div");
                    checkdiv.className = "custom-control custom-checkbox text-danger";
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
                    trashElement.className = "trash"
                    trashElement.innerHTML = '<svg class="bi bi-trash2-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M2.037 3.225l1.684 10.104A2 2 0 005.694 15h4.612a2 2 0 001.973-1.671l1.684-10.104C13.627 4.224 11.085 5 8 5c-3.086 0-5.627-.776-5.963-1.775z"/><path fill-rule="evenodd" d="M12.9 3c-.18-.14-.497-.307-.974-.466C10.967 2.214 9.58 2 8 2s-2.968.215-3.926.534c-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466zM8 5c3.314 0 6-.895 6-2s-2.686-2-6-2-6 .895-6 2 2.686 2 6 2z" clip-rule="evenodd"/></svg>';
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

    showSemester(kursName,kursId){
        //Kurs in Inputfeld eintragen
        document.getElementById("inputAddKurs").value = kursName;











        
        // document.getElementById(kursId).style.color = "#E30013";

        //Mit kursId nach Semester des Kurses suchen
        if(document.getElementById(kursId).parentNode.nextSibling == null || document.getElementById(kursId).parentNode.nextSibling.id != "semesterRahmen"){
            var semRahmen = document.createElement("div");
            semRahmen.id = "semesterRahmen";
            // semRahmen.appendChild(document.createElement("hr"));

            fetch("/semester/0", {
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
                        semElement.id = this.state.showSemester[i]["semId"];
                        semElement.onclick = () => this.intoTermine(kursName, this.state.showSemester[i]["sem_bez"]); 
                        semElement.innerHTML = this.state.showSemester[i]["sem_bez"];
                        semRahmen.appendChild(semElement);
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

    intoTermine(kursName, semName){
        document.getElementById("inputKurs").value = kursName;
        document.getElementById("inputSemester").value = semName;
    }

    lookupTermineSemester(kursId, semId){

        //Anfrage mit IDs ans Backend schicken, an "Termine" anhängen



        //Namen von kursId und semId aus Abfrage holen und in eingabe felder packen
        // document.getElementById("inputKurs").value = 
        // document.getElementById("inputSemester").value = 
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
                
                <div className="content" >
                    <h1 className="display-4">Termine</h1>
                    <hr></hr>
                    <form>
                        <div className="row">
                            <div className="col" id="searchKurs">
                                <input type="text" className="form-control" name="kurs" placeholder="Kurs" id="inputKurs" />
                            </div>
                            <div className="col" id="searchSemester">
                                <input type="text" className="form-control" name="semester" placeholder="Semester" id="inputSemester" />
                                <button type="submit" className="btn btn-primary mb-2" id="termine-search">
                                    <svg className="bi bi-search" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clip-rule="evenodd"/>
                                        <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clip-rule="evenodd"/>
                                    </svg>
                                </button>
                            </div>
                            
                            
                        </div>
                    </form>
                   
                          
                </div>
                
            </div>

        );
        
    }

}


export default Kurse;