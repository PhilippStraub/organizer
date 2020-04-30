import React from 'react';
import './termine.css';


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




class Termine extends React.Component{
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
        this.dateExistsTermin = this.dateExistsTermin;
        this.addTermin = this.addTermin.bind(this);
        this.inspectTermin = this.inspectTermin.bind(this);
        this.patchTermin = this.patchTermin.bind(this);
        this.deleteTermin = this.deleteTermin.bind(this);
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
            terminPerMonth: {
                0:[null],
                1:[null],
                2:[null],
                3:[null],
                4:[null],
                5:[null],
                6:[null],
                7:[null],
                8:[null],
                9:[null],
                10:[null],
                11:[null]
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
            date: undefined,
            terminForInspect: {
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
            addTerminData: {
                "datum": "",
                "semesterId": ""
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
        //             check.checked = false;this.state.date
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
            this.state.date = undefined;

            this.setState({
                terminPerMonth: [[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11]]
            });
            for (let i=0; i < this.state.lookupTermineSemester.length; i++){
                var datum = new Date(this.state.lookupTermineSemester[i]["terDatum"]);

                if(this.state.date == undefined || this.state.date > datum){
                    this.setState({
                        date: datum
                    });
                }
                var month = datum.getMonth();



                var altTerminPerMoth = [[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11]];
                if(this.state.terminPerMonth){
                    altTerminPerMoth = this.state.terminPerMonth;
                }
                altTerminPerMoth[month].push(this.state.lookupTermineSemester[i])
                this.setState({
                    terminPerMonth: altTerminPerMoth
                });

                
            }
            if(this.state.date == undefined){
                var d = new Date();
                this.state.date = d;
            }
            
            this.getTermineMonth(this.state.date, object["semid"]);            
        })
        .catch(err => {
            console.log(err);
        });

    }

    getDays(month, year) {
        return new Date(year, month +1, 0).getDate();
    }

    getTermineMonth(date, semesterId){
        date.setDate(1);
        var left= new Date(date);
        left.setMonth(left.getMonth() - 1);
        var right= new Date(date);
        right.setMonth(right.getMonth() + 1);
        var month = date.getMonth();
        var year = date.getFullYear();
        if(document.getElementById("kalenderbar")){
            document.getElementById("contentTermine").removeChild(document.getElementById("kalenderbar"));
            document.getElementById("contentTermine").removeChild(document.getElementById("kalender"));
        }
        var days = this.getDays(month, year);
        var rest = days % 5;
        if(rest != 0){
            rest = 5 - rest;
        }

        var daysrest = rest + days;

        var monthArr = new Array();
        monthArr[0] = "Januar";
        monthArr[1] = "Februar";
        monthArr[2] = "März";
        monthArr[3] = "April";
        monthArr[4] = "Mai";
        monthArr[5] = "Juni";
        monthArr[6] = "Juli";
        monthArr[7] = "August";
        monthArr[8] = "September";
        monthArr[9] = "Oktober";
        monthArr[10] = "November";
        monthArr[11] = "Dezember";
        var monthName = monthArr[month];
        
        var kalenderbar = document.createElement("div");
        kalenderbar.id ="kalenderbar";
        kalenderbar.className = "d-flex justify-content-center";
        
        var leftArrow = document.createElement("div");
        leftArrow.onclick = () => this.getTermineMonth(left, semesterId);
        leftArrow.innerHTML = '<svg class="bi bi-chevron-compact-left" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9.224 1.553a.5.5 0 01.223.67L6.56 8l2.888 5.776a.5.5 0 11-.894.448l-3-6a.5.5 0 010-.448l3-6a.5.5 0 01.67-.223z" clip-rule="evenodd"/></svg>';
        

        var headline = document.createElement("h2");
        headline.className = "display-4";
        headline.id = "mon";
        headline.innerHTML = monthName + " " + year;

        var rightArrow = document.createElement("div");
        rightArrow.onclick = () => this.getTermineMonth(right, semesterId);
        rightArrow.innerHTML = '<svg class="bi bi-chevron-compact-right" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.776 1.553a.5.5 0 01.671.223l3 6a.5.5 0 010 .448l-3 6a.5.5 0 11-.894-.448L9.44 8 6.553 2.224a.5.5 0 01.223-.671z" clip-rule="evenodd"/></svg>';
        

        kalenderbar.appendChild(leftArrow);
        kalenderbar.appendChild(headline);
        kalenderbar.appendChild(rightArrow);
        
        document.getElementById("contentTermine").appendChild(kalenderbar);

        //Kalender


        var kalender = document.createElement("div");
        kalender.id = "kalender";
        kalender.className = "d-flex flex-wrap";
        
        var restnum = 1;
        

        for (let i=1; i<= daysrest; i++){
            
            if(i <= days){
                
                //Dieser Monat
                var day = document.createElement("div");
                day.className = "day";
                // day.id= semId;
                day.innerHTML = '<div class="num">' + i +'</div>';
                
                var datum= new Date(date);
                datum.setDate(i);
                

                //Create key value obj with date n semid
                const objdata = { "datum": datum, "semesterId": semesterId };
                
                
                /*


                */
               
                if(this.state.lookupTermineSemester.length != 0){
                    //Es exisitieren Termine

                    var termine = this.dateExistsTermin(datum,month);
                    
                    if(termine[0] != undefined && termine[0] != null){ 
                        
                        if(termine[1] == null){
                            //Plus und Termin erstellen
                            var termin = document.createElement("div");
                            termin.className = "termin";
                            const ram = termine[0];
                            termin.onclick =() => {
                                
                                this.setState({
                                    terminForInspect: ram
                                });
                                
                                this.inspectTermin();
                            }
                            

                            
                            termin.setAttribute("data-toggle", "modal");
                            termin.setAttribute("data-target", "#viewModalCenter");
                            termin.innerHTML = termine[0]["terVonUhrzeit"] + ' - ' + termine[0]["terBisUhrzeit"] + 
                                                '<br/>Raum: ' + termine[0]["raumNr"]+ '<br/>' +
                                                termine[0]["vorlesungen"]["vorName"] + '<br/>' + termine[0]["vorlesungen"]["dozenten"]["dozNachname"];
                            
                            if(termine[0]["verfügbar"]){
                                var haken = document.createElement("div");
                                haken.innerHTML = '<svg class="bi bi-check" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/></svg>';
                                termin.appendChild(haken);
                            } else {
                                var loading = document.createElement("div");
                                loading.innerHTML = '<svg class="bi bi-arrow-repeat" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2.854 7.146a.5.5 0 00-.708 0l-2 2a.5.5 0 10.708.708L2.5 8.207l1.646 1.647a.5.5 0 00.708-.708l-2-2zm13-1a.5.5 0 00-.708 0L13.5 7.793l-1.646-1.647a.5.5 0 00-.708.708l2 2a.5.5 0 00.708 0l2-2a.5.5 0 000-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 3a4.995 4.995 0 00-4.192 2.273.5.5 0 01-.837-.546A6 6 0 0114 8a.5.5 0 01-1.001 0 5 5 0 00-5-5zM2.5 7.5A.5.5 0 013 8a5 5 0 009.192 2.727.5.5 0 11.837.546A6 6 0 012 8a.5.5 0 01.501-.5z" clip-rule="evenodd"/></svg>';
                                termin.appendChild(loading);
                            }
                            var plus = document.createElement("div");
                            plus.className = "addTermin";
                            plus.innerHTML = '<svg class="bi bi-plus-circle" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/></svg>';
                            plus.onclick = () => this.setState({
                                addTerminData:{
                                    "datum": objdata["datum"],
                                    "semesterId" : objdata["semesterId"]
                                }
                            });
                            plus.setAttribute("data-toggle", "modal");
                            plus.setAttribute("data-target", "#exampleModalCenter");

                            day.appendChild(termin);
                            day.appendChild(plus);

                        } else {
                            //Beide Termine rein da
                            //t1

                            //Termine in zeitliche Reihenfolge bringen auf Stundenbasis
                            var str0 = termine[0]["terVonUhrzeit"];
                            str0 = str0.slice(0, -6);
                            str0 = parseInt(str0);
                            var str1 = termine[1]["terVonUhrzeit"];
                            str1 = str1.slice(0, -6);
                            str1 = parseInt(str1);
                            if(str0<str1){
                            } else if(str1<str0) {
                                //termin 1 muss index 0 werden
                                var ramTermine = termine[0];
                                termine[0] = termine[1];
                                termine[1] = ramTermine;
                            }

                            
                            var termin0 = document.createElement("div");
                            termin0.className = "termin";
                            const ram1 = termine[0];
                            termin0.onclick =() => {
                                
                                this.setState({
                                    terminForInspect: ram1
                                });
                                
                                this.inspectTermin();
                            }
                            termin0.innerHTML = termine[0]["terVonUhrzeit"] + ' - ' + termine[0]["terBisUhrzeit"] + 
                                                '<br/>Raum: ' + termine[0]["raumNr"]+ '<br/>' +
                                                termine[0]["vorlesungen"]["vorName"] + '<br/>' + termine[0]["vorlesungen"]["dozenten"]["dozNachname"];
                            termin0.setAttribute("data-toggle", "modal");
                            termin0.setAttribute("data-target", "#viewModalCenter");

                            if(termine[0]["verfügbar"]){
                                var haken = document.createElement("div");
                                haken.innerHTML = '<svg class="bi bi-check" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/></svg>';
                                termin0.appendChild(haken);
                            } else {
                                var loading = document.createElement("div");
                                loading.innerHTML = '<svg class="bi bi-arrow-repeat" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2.854 7.146a.5.5 0 00-.708 0l-2 2a.5.5 0 10.708.708L2.5 8.207l1.646 1.647a.5.5 0 00.708-.708l-2-2zm13-1a.5.5 0 00-.708 0L13.5 7.793l-1.646-1.647a.5.5 0 00-.708.708l2 2a.5.5 0 00.708 0l2-2a.5.5 0 000-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 3a4.995 4.995 0 00-4.192 2.273.5.5 0 01-.837-.546A6 6 0 0114 8a.5.5 0 01-1.001 0 5 5 0 00-5-5zM2.5 7.5A.5.5 0 013 8a5 5 0 009.192 2.727.5.5 0 11.837.546A6 6 0 012 8a.5.5 0 01.501-.5z" clip-rule="evenodd"/></svg>';
                                termin0.appendChild(loading);
                            }

                            //t2

                            var termin1 = document.createElement("div");
                            termin1.className = "termin";
                            const ram2 = termine[1];
                            termin1.onclick =() => {
                                
                                this.setState({
                                    terminForInspect: ram2
                                });
                                
                                this.inspectTermin();
                            }
                            termin1.innerHTML = termine[1]["terVonUhrzeit"] + ' - ' + termine[1]["terBisUhrzeit"] + 
                                                '<br/>Raum: ' + termine[1]["raumNr"]+ '<br/>' +
                                                termine[1]["vorlesungen"]["vorName"] + '<br/>' + termine[1]["vorlesungen"]["dozenten"]["dozNachname"];
                            termin1.setAttribute("data-toggle", "modal");
                            termin1.setAttribute("data-target", "#viewModalCenter");
                            if(termine[1]["verfügbar"]){
                                var haken = document.createElement("div");
                                haken.innerHTML = '<svg class="bi bi-check" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/></svg>';
                                termin1.appendChild(haken);
                            } else {
                                var loading = document.createElement("div");
                                loading.innerHTML = '<svg class="bi bi-arrow-repeat" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2.854 7.146a.5.5 0 00-.708 0l-2 2a.5.5 0 10.708.708L2.5 8.207l1.646 1.647a.5.5 0 00.708-.708l-2-2zm13-1a.5.5 0 00-.708 0L13.5 7.793l-1.646-1.647a.5.5 0 00-.708.708l2 2a.5.5 0 00.708 0l2-2a.5.5 0 000-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 3a4.995 4.995 0 00-4.192 2.273.5.5 0 01-.837-.546A6 6 0 0114 8a.5.5 0 01-1.001 0 5 5 0 00-5-5zM2.5 7.5A.5.5 0 013 8a5 5 0 009.192 2.727.5.5 0 11.837.546A6 6 0 012 8a.5.5 0 01.501-.5z" clip-rule="evenodd"/></svg>';
                                termin1.appendChild(loading);
                            }


                            day.appendChild(termin0);
                            day.appendChild(termin1);
                        }
                        
                    }else {
                        //Plus erstellen
                        var plus = document.createElement("div");
                        plus.className = "addTermin";
                        plus.innerHTML = '<svg class="bi bi-plus-circle" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/></svg>';
                        plus.onclick = () => this.setState({
                            addTerminData:{
                                "datum": objdata["datum"],
                                "semesterId" : objdata["semesterId"]
                            }
                        });
                        plus.setAttribute("data-toggle", "modal");
                        plus.setAttribute("data-target", "#exampleModalCenter");
                        day.appendChild(plus);
                        
                    }

                } else {
                    //Es exisitieren keine Termine
                    var plus = document.createElement("div");
                    plus.className = "addTermin";
                    plus.innerHTML = '<svg class="bi bi-plus-circle" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/></svg>';
                    plus.onclick = () => this.setState({
                        addTerminData:{
                            "datum": objdata["datum"],
                            "semesterId" : objdata["semesterId"]
                        }
                    });
                    plus.setAttribute("data-toggle", "modal");
                    plus.setAttribute("data-target", "#exampleModalCenter");
                    
                    
                    day.appendChild(plus);
                    
                }
                
                
                kalender.appendChild(day);
                
            } else {
                //Nächster Mon
                
                var day = document.createElement("div");
                day.className = "day";
                day.id= "nextMon";
                day.innerHTML = '<div class="num">' + restnum +'</div>';
                kalender.appendChild(day);
                restnum++;
            }
            

        }


        document.getElementById("contentTermine").appendChild(kalender);

    }

    dateExistsTermin(date,month){
        var termine = [null, null];
        
        
        if(this.state.terminPerMonth[month] != null){
            
            for(let i=0; i< this.state.terminPerMonth[month].length; i++){
                var statedate = new Date(this.state.terminPerMonth[month][i]["terDatum"]);
                if(statedate.getDate() == date.getDate()){
                    if(termine[0] == null){
                        termine[0] = this.state.terminPerMonth[month][i];
                    } else {
                        termine[1] = this.state.terminPerMonth[month][i];
                    }
                    
                } else {

                }
            }
            return termine;
        } else {
            //Keine Termine in diesem Monat
            return [undefined, undefined];
        }
       
        
    }

    addTermin(event){
        //Form von Pop-up auswerten und DAten an Backend schicken

        event.preventDefault();
        const data = new FormData(event.target);
        var object = {};
        data.forEach(function(value, key){
            object[key] = value;
        });

        var SemIdArray = {};
        SemIdArray["semId"] = this.state.addTerminData["semesterId"];
        var VorIdArray = {};
        VorIdArray["vorId"] = object["vorId"];
        var jsonArray = {};
        jsonArray["terDatum"] = this.state.addTerminData["datum"];
        jsonArray["terVonUhrzeit"] =  object["terVonUhrzeit"]+ ":00";
        jsonArray["terBisUhrzeit"] =  object["terBisUhrzeit"]+ ":00";
        jsonArray["raumNr"] = object["raumNr"];
        jsonArray["verfügbar"] = "false";
        jsonArray["semester"] =  SemIdArray;
        jsonArray["vorlesungen"] =  VorIdArray;
        var json = JSON.stringify(jsonArray)
        
        fetch("https://vorlesungsplaner.herokuapp.com/termine", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "Authorization": "Bearer " + getCookie("token")
            },
        "body": json
        })
        .then(response => {
            if(response.ok){
                document.getElementById("exampleModalCenterClose").click();
                document.getElementById("inputAddTerminVorlesung").value = "";
                document.getElementById("inputAddTerminRaum").value = "";
                document.getElementById("inputAddTerminBeginn").value = "";
                document.getElementById("inputAddTerminEnde").value = "";
                document.getElementById("termine-search").click();
            }

        })
        .catch(err => {
            console.log(err);
        });

        

    }

    inspectTermin(){
        var termin = this.state.terminForInspect;
        
        
        document.getElementById("inputViewTerminDatum").value = termin["terDatum"];
        document.getElementById("inputViewTerminDozent").value = termin["vorlesungen"]["dozenten"]["dozNachname"];
        document.getElementById("inputViewTerminVorlesung").value = termin["vorlesungen"]["vorName"];
        document.getElementById("inputViewTerminVorlesungId").value = termin["vorlesungen"]["vorId"];
        document.getElementById("inputViewTerminRaum").value = termin["raumNr"];
        document.getElementById("inputViewTerminBeginn").value = termin["terVonUhrzeit"];
        document.getElementById("inputViewTerminEnde").value = termin["terBisUhrzeit"];

    }

    patchTermin(event){
        var termin = this.state.terminForInspect;
        event.preventDefault();
        const data = new FormData(event.target);
        var object = {};
        data.forEach(function(value, key){
            object[key] = value;
        });

        var SemIdArray = {};
        SemIdArray["semId"] = termin["semester"]["semId"];
        var VorIdArray = {};
        VorIdArray["vorId"] = object["vorId"];
        var jsonArray = {};
        jsonArray["terId"] = termin["terId"];
        jsonArray["terDatum"] =  object["terDatum"];
        jsonArray["terVonUhrzeit"] = object["terVonUhrzeit"];
        jsonArray["terBisUhrzeit"] = object["terBisUhrzeit"];
        jsonArray["raumNr"] = object["raumNr"];
        jsonArray["verfügbar"] = termin["verfügbar"];
        jsonArray["semester"] =  SemIdArray;
        jsonArray["vorlesungen"] =  VorIdArray;
        var json = JSON.stringify(jsonArray)

        fetch("https://vorlesungsplaner.herokuapp.com/termine/"+termin["terId"], {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + getCookie("token")
        },
        "body":json
        })
        .then(response => {
            if(response.ok){
                document.getElementById("viewModalCenterClose").click();
                document.getElementById("termine-search").click();
            }
        })
        .catch(err => {
        console.log(err);
        });

    }

    deleteTermin(){
        var termin = this.state.terminForInspect;
        fetch("https://vorlesungsplaner.herokuapp.com/termine/" + termin["terId"], {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + getCookie("token")
            }
        })
        .then(response => {
            if(response.ok){
                document.getElementById("viewModalCenterClose").click();
                document.getElementById("termine-search").click();
            }
        })
        .catch(err => {
        console.log(err);
        });
    }
    

    render() {



        
        return(
            <div id="mainTermine">
                <div className="content" id="submit">
                        <a>
                            <h1 className="display-4">Ausstehende Bestätigungen</h1>
                            <hr></hr>
                        </a>
                        <div id="submitlist">
                            
                            <div class="termindata input-group">
                                
                                <input type="text" class="center form-control" value="9:00-12:00"/>
                                <input type="text" readonly class="center form-control" value="Dienstleistungsmanagement" />
                                <div class="input-group-append">
                                    <button class="btn btn-outline-danger" type="button">
                                        <svg class="bi bi-check" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>
                                        </svg>
                                    </button>
                                  
                                </div>
                            </div>
                            <div class="termindata input-group">
                                
                                <input type="text" class="center form-control" value="9:00-12:00"/>
                                <input type="text" readonly class="center form-control" value="Dienstleistungsmanagement" />
                                <div class="input-group-append">
                                    <button class="btn btn-outline-danger" type="button">
                                        <svg class="bi bi-check" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>
                                        </svg>
                                    </button>
                                  
                                </div>
                            </div>
                            <div class="termindata input-group">
                                
                                <input type="text" class="center form-control" value="9:00-12:00"/>
                                <input type="text" readonly class="center form-control" value="Dienstleistungsmanagement" />
                                <div class="input-group-append">
                                    <button class="btn btn-outline-danger" type="button">
                                        <svg class="bi bi-check" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>
                                        </svg>
                                    </button>
                                  
                                </div>
                            </div>
                            <div class="termindata input-group">
                                
                                <input type="text" class="center form-control" value="9:00-12:00"/>
                                <input type="text" readonly class="center form-control" value="Dienstleistungsmanagement" />
                                <div class="input-group-append">
                                    <button class="btn btn-outline-danger" type="button">
                                        <svg class="bi bi-check" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>
                                        </svg>
                                    </button>
                                  
                                </div>
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
                                <button type="submit" className="btn btn-danger mb-2" id="termine-search">
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
 
                    
                    
                    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <form onSubmit={this.addTermin} id="addTermin" name="AddTerminform">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLongTitle">Neuen Termin erstellen</h5>
                                        <button type="button" class="close" id="exampleModalCenterClose" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <input id="inputAddTerminVorlesung" type="text" className="form-control" name="vorId" placeholder="Id der Vorlesung" required /><br />
                                        <input id="inputAddTerminRaum" type="text" className="form-control" name="raumNr" placeholder="Raum Nr." required />
                                    
                                        <br />
                                        <div class="input-group">
                                            <input id="inputAddTerminBeginn" type="text" className="form-control" name="terVonUhrzeit" placeholder="Vorlesungsbeginn (hh:mm)" required /><br />
                                            <input id="inputAddTerminEnde" type="text" className="form-control" name="terBisUhrzeit" placeholder="Vorlesungsende (hh:mm)" required />
                                        </div>
                      
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Abbrechen</button>
                                        <button type="button" class="btn btn-danger" type="submit">Erstellen</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="viewModalCenter" tabindex="-1" role="dialog" aria-labelledby="viewModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <form onSubmit={this.patchTermin} id="addTermin" name="AddTerminform">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="viewModalLongTitle">Termin bearbeiten</h5>
                                    <button type="button" class="close" id="viewModalCenterClose" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                    
                                </div>
                                <div class="modal-body">
                                    <div className="modalReihe">
                                        <p>Datum</p>                        
                                        <input type="text" class="form-control" id="inputViewTerminDatum" name="terDatum" placeholder="Datum"/>
                                    </div>
                                    <div className="modalReihe">
                                        <p>Dozent</p>                          
                                        <input id="inputViewTerminDozent" type="text" readonly className="form-control-plaintext" name="dozNachname" placeholder="Dozent" required />
                                    </div>
                                    <div className="modalReihe">
                                        <p>Vorlesung</p>
                                        <div class="input-group">
                                            
                                            <input id="inputViewTerminVorlesung" type="text" readonly className="form-control-plaintext" name="vorName" placeholder="Vorlesung" required /><br />
                                            <input id="inputViewTerminVorlesungId" type="text" className="form-control" name="vorId" placeholder="Id" required />
                                            
                                        </div>
                                    </div>
                                    <div className="modalReihe">
                                        <p>Raum</p>
                                        <input id="inputViewTerminRaum" type="text" className="form-control" name="raumNr" placeholder="Raum Nr." required />
                                    </div>
                                    <div className="modalReihe">
                                        <p>Zeitspanne</p>
                                        <div class="input-group">
                                        
                                            <input id="inputViewTerminBeginn" type="text" className="form-control" name="terVonUhrzeit" placeholder="Vorlesungsbeginn (hh:mm:ss)" required /><br />
                                            <input id="inputViewTerminEnde" type="text" className="form-control" name="terBisUhrzeit" placeholder="Vorlesungsende (hh:mm:ss)" required />
                                        </div>
                                    </div>
                                    
                                   
                                
                                    
                                    
                    
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-danger" id="modalDelete" onClick={this.deleteTermin}>Löschen</button>
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Abbrechen</button>
                                    
                                    <button type="button" class="btn btn-danger" type="submit">Editieren</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>

        );
        
    }

}


export default Termine;