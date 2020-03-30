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
            

            
            // kurData[0] = '<div class="kurs">WWI2018C</div>';
            // kurData[1] = <div class="kurs">WWI2018H</div>;
            // kurData[2] = <div class="kurs">WWI2018I</div>;
            
            // for(let i=0; i< kurData.length; i++){
            //     showmain.innerHTML = showmain.innerHTML + kurData[i];
            // }
            // showmain.innerHTML = kurData.join();
            // showmain.innerHTML = '<div class="kurs">WWI2018H</div><div class="kurs">WWI2018I</div><div class="kurs">WWI2018J</div>';
            
            
            //fetch ABfrage mit Kursen muss hier rein und in die innerHTML von showmain geschrieben werden.
            fetch("/kurs/0", {
                "method": "GET",
                "headers": {
                    "authorization": "Bearer " + getCookie("token")
                }
            })
            .then(dataWrappedByPromise => dataWrappedByPromise.json())
            .then((response) => {
                console.log(response);

                this.setState({
                    showKurse: response
                });

                
                for (let i=0; i < this.state.showKurse.length; i++){
                    var kursElement = document.createElement("div");
                    kursElement.className = "kurs";
                    kursElement.id = this.state.showKurse[i]["kurId"];
                    kursElement.onclick = () => this.showSemester(this.state.showKurse[i]["kurBezeichnung"],this.state.showKurse[i]["kurId"]);
                    kursElement.innerHTML = this.state.showKurse[i]["kurBezeichnung"]
                    showmain.appendChild(kursElement);
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

        //Mit kursId nach Semester des Kurses suchen
        if(document.getElementById(kursId).nextSibling == null || document.getElementById(kursId).nextSibling.id != "semesterRahmen"){
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
                console.log(response);

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
                document.getElementById(kursId).parentNode.insertBefore(semRahmen, document.getElementById(kursId).nextSibling);
            })
            .catch((err) => {
                console.log(err);
            })
        } else{
            document.getElementById("inputAddKurs").value = "";
            while (document.getElementById(kursId).nextSibling !=null && document.getElementById(kursId).nextSibling.id == "semesterRahmen") {
                document.getElementById(kursId).parentNode.removeChild(document.getElementById(kursId).nextSibling);
              }
        }
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
            <div>
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

                    <form onSubmit={this.handleSubmitSemester} id="semester">
                        <div className="inputfields">
                            <div className="form-row">
                                <div className="input-group" id="inp-g">
                                    <div className="input-group-prepend" id="inp">
                                    <span className="input-group-text" id="inputGroupPrepend2" onClick={this.handleSubmitSemester}>
                                        +
                                    </span>
                                    </div>
                                    <input id="inputAddSemester" type="text" className="form-control" name="sem_bez" placeholder="Semester" />
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