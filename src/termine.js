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
        this.lookupTermineSemester = this.lookupTermineSemester.bind(this);
        this.checkbox = this.checkbox;
        this.deleteKurs = this.deleteKurs;
        this.deleteSemester = this.deleteSemester;
        this.getDays = this.getDays;
        this.dateExistsTermin = this.dateExistsTermin;
        this.inspectTermin = this.inspectTermin.bind(this);
        this.patchTermin = this.patchTermin.bind(this);
        this.deleteTermin = this.deleteTermin.bind(this);
        this.lookupUnaccepted = this.lookupUnaccepted.bind(this);
        this.sendTrue = this.sendTrue;
        this.state = {
            
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
            lookupUnaccepted: {
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
            unacceptedInspect: undefined,
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
            }
            
                
        
        };
    }

    lookupUnaccepted(){
        fetch("https://vorlesungsplaner.herokuapp.com/termine/dozenten/0" + getCookie("DozId"), {
            method: "GET",
            headers: {
                "authorization": "Bearer " + getCookie("token")
            }
        })
        .then(dataWrappedByPromise => dataWrappedByPromise.json())
        .then(res => {
            console.log(res);
            this.setState({
                lookupUnaccepted: res
            })
            
            var found = false;
            document.getElementById("submitlist").removeChild(document.getElementById("bestanzeigen"));

            for (let i=0; i < this.state.lookupUnaccepted.length; i++){   
                if(this.state.lookupUnaccepted[i]["verfügbar"] == false){
                    found = true;

                    var rahmen = document.createElement("div");
                    rahmen.className = "termindata input-group";

                    var in1 = document.createElement("input");
                    in1.type = "text";
                    in1.className = "center form-control";
                    var date = this.state.lookupUnaccepted[i]["terDatum"];
                    var datestr = date.slice(0, 10);

                    in1.value = datestr + ": " + this.state.lookupUnaccepted[i]["terVonUhrzeit"] + "-" + this.state.lookupUnaccepted[i]["terBisUhrzeit"];

                    var in2 = document.createElement("input");
                    in2.type = "text";
                    in2.className = "center form-control";
                    in2.value = this.state.lookupUnaccepted[i]["vorlesungen"]["vorName"];
                    
                    var butRahmen = document.createElement("div");
                    butRahmen.className = "input-group-append";
                    var button = document.createElement("button");
                    button.className = "btn btn-outline-danger"
                    button.type = "button";
                    button.innerHTML = '<svg class="bi bi-check" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/></svg>'
                    button.onclick =() => {
                                
                        this.setState({
                            unacceptedInspect: this.state.lookupUnaccepted[i]
                        });
                        
                        this.sendTrue();
                    }
                    


                    rahmen.appendChild(in1);
                    rahmen.appendChild(in2);
                    butRahmen.appendChild(button)
                    rahmen.appendChild(butRahmen);
                    document.getElementById("submitlist").appendChild(rahmen);  
                }
                
            }

            if(found==false){
                var rahmen = document.createElement("div");
                rahmen.className = "center";

                var zitat = document.createElement("div");
                zitat.id = "zitatTermine";
                zitat.innerHTML = "<cite>Keine neuen Vorlesungen zu bestätigen.</cite>"
                rahmen.appendChild(zitat);
                document.getElementById("submitlist").appendChild(rahmen);
            }

            
            
        })
        .catch(err => {
            console.log(err);
        });
    }

    sendTrue(){
        var termin = this.state.unacceptedInspect;
        termin["verfügbar"] = "true";
        
        var json = JSON.stringify(termin);
        fetch("https://vorlesungsplaner.herokuapp.com/termine/0" + termin["terId"], {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            "authorization": "Bearer " + getCookie("token")
        },
        body:json
        })
        .then(response => {
            window.location.reload();
        })
        .catch(err => {
        console.log(err);
        });

    }
    

    lookupTermineSemester(){

        //Anfrage mit IDs ans Backend schicken, an "Termine" anhängen

        fetch("https://vorlesungsplaner.herokuapp.com/termine/dozenten/" + getCookie("DozId"), {
            method: "GET",
            headers: {
                "authorization": "Bearer " + getCookie("token")
            }
        })
        .then(dataWrappedByPromise => dataWrappedByPromise.json())
        .then(res => {
            console.log(res);
            this.setState({
                lookupTermineSemester: res
            });

            this.state.date = undefined;

            this.setState({
                terminPerMonth: [[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11]]
            });
            for (let i=0; i < this.state.lookupTermineSemester.length; i++){
                var datum = new Date(this.state.lookupTermineSemester[i]["terDatum"]);

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
            
            this.getTermineMonth(this.state.date);        
        })
        .catch(err => {
            console.log(err);
        });

    }

    getDays(month, year) {
        return new Date(year, month +1, 0).getDate();
    }

    getTermineMonth(date){
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
        leftArrow.onclick = () => this.getTermineMonth(left);
        leftArrow.innerHTML = '<svg class="bi bi-chevron-compact-left" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9.224 1.553a.5.5 0 01.223.67L6.56 8l2.888 5.776a.5.5 0 11-.894.448l-3-6a.5.5 0 010-.448l3-6a.5.5 0 01.67-.223z" clip-rule="evenodd"/></svg>';
        

        var headline = document.createElement("h2");
        headline.className = "display-4";
        headline.id = "mon";
        headline.innerHTML = monthName + " " + year;

        var rightArrow = document.createElement("div");
        rightArrow.onclick = () => this.getTermineMonth(right);
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
                const objdata = { "datum": datum, "semesterId": "" };
                
                
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
                            termin.innerHTML = termine[0]["vorlesungen"]["vorName"] + '<br/>' + termine[0]["terVonUhrzeit"] + ' - ' + termine[0]["terBisUhrzeit"] + '<br/>' +
                            termine[0]["semester"]["kurs"]["kurBezeichnung"] +'<br/>Raum: ' + termine[0]["raumNr"];
                            
                            if(termine[0]["verfügbar"]){
                                var haken = document.createElement("div");
                                haken.innerHTML = '<svg class="bi bi-check" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/></svg>';
                                termin.appendChild(haken);
                            } else {
                                var loading = document.createElement("div");
                                loading.innerHTML = '<svg class="bi bi-arrow-repeat" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2.854 7.146a.5.5 0 00-.708 0l-2 2a.5.5 0 10.708.708L2.5 8.207l1.646 1.647a.5.5 0 00.708-.708l-2-2zm13-1a.5.5 0 00-.708 0L13.5 7.793l-1.646-1.647a.5.5 0 00-.708.708l2 2a.5.5 0 00.708 0l2-2a.5.5 0 000-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 3a4.995 4.995 0 00-4.192 2.273.5.5 0 01-.837-.546A6 6 0 0114 8a.5.5 0 01-1.001 0 5 5 0 00-5-5zM2.5 7.5A.5.5 0 013 8a5 5 0 009.192 2.727.5.5 0 11.837.546A6 6 0 012 8a.5.5 0 01.501-.5z" clip-rule="evenodd"/></svg>';
                                termin.appendChild(loading);
                            }
                        

                            day.appendChild(termin);


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
                                                termine[0]["vorlesungen"]["vorName"] + '<br/>' + termine[0]["semester"]["kurs"]["kurBezeichnung"];
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
                                                termine[1]["vorlesungen"]["vorName"] + '<br/>' + termine[1]["semester"]["kurs"]["kurBezeichnung"];
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

                        
                    }

                } else {
                    //Es exisitieren keine Termine

                    
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

        document.getElementById("contentTermine").removeChild(document.getElementById("teranzeigen"));
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



    inspectTermin(){
        var termin = this.state.terminForInspect;
        
        
        document.getElementById("inputViewTerminDatum").value = termin["terDatum"];
        document.getElementById("inputViewTerminDozent").value = termin["vorlesungen"]["dozenten"]["dozNachname"];
        document.getElementById("inputViewTerminVorlesung").value = termin["vorlesungen"]["vorName"];
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
        var jsonArray = {};
        jsonArray["terId"] = termin["terId"];
        jsonArray["terDatum"] =  termin["terDatum"];
        jsonArray["terVonUhrzeit"] = object["terVonUhrzeit"];
        jsonArray["terBisUhrzeit"] = object["terBisUhrzeit"];
        jsonArray["verfügbar"] = termin["verfügbar"];
        jsonArray["raumNr"] = termin["raumNr"];
        jsonArray["semester"] =  SemIdArray;
        jsonArray["vorlesungen"] =  termin["vorlesungen"];
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
                window.location.reload();
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
                window.location.reload();
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
                            <div id="bestanzeigen" className="center" onClick={this.lookupUnaccepted}>
                                <cite>Bestätigungen anzeigen</cite><br/>
                                <svg class="showbest bi bi-chevron-compact-down" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 01.67-.223L8 9.44l5.776-2.888a.5.5 0 11.448.894l-6 3a.5.5 0 01-.448 0l-6-3a.5.5 0 01-.223-.67z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                        
                            
                        </div>
                </div>
                
                
                <div className="content" id="contentTermine" >
                    <h1 className="display-4">Termine</h1>
                    <hr></hr>
                    <div id="teranzeigen" className="center" onClick={this.lookupTermineSemester}>
                        <cite>Termine anzeigen</cite><br/>
                        <svg class="showbest bi bi-chevron-compact-down" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 01.67-.223L8 9.44l5.776-2.888a.5.5 0 11.448.894l-6 3a.5.5 0 01-.448 0l-6-3a.5.5 0 01-.223-.67z" clip-rule="evenodd"/>
                        </svg>
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
                                        <input type="text" readonly className="form-control-plaintext" id="inputViewTerminDatum" name="terDatum" placeholder="Datum"/>
                                    </div>
                                    <div className="modalReihe">
                                        <p>Dozent</p>                          
                                        <input id="inputViewTerminDozent" type="text" readonly className="form-control-plaintext" name="dozNachname" placeholder="Dozent" required />
                                    </div>
                                    <div className="modalReihe">
                                        <p>Vorlesung</p>
                                        <div class="input-group">
                                            
                                            <input id="inputViewTerminVorlesung" type="text" readonly className="form-control-plaintext" name="vorName" placeholder="Vorlesung" required /><br />
                                            
                                        </div>
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