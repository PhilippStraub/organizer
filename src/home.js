import React from 'react';
import './home.css';

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


class Home extends React.Component{
    //Later there will be a .js for each header in menu like Dozenten, Termine, etc.
    //These .js Files will have two different main components: One full and one shorter view
    //the export default will always be the shorter version
    //that way we're able to include them here in our home view but also seperate them.
    render() {
        return(
            <div><br></br><br></br>
                <div className="rahmenlogohome"></div>
              <div id="begruessung">
                 <div className="content" id="begruessung2">
                    <a>
                        <h1 className="display-4">Herzlich Willkommen {getCookie("user")}!</h1>

                        <hr></hr>
                        </a>
                        <div className="beg-text">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        </div>    <iframe className="youtubevideo"src="https://www.youtube.com/embed/tgbNymZ7vqY">
</iframe>

                    
                   
                    
                            
                </div>
                
            </div> 
            </div>

        );
        
      }

}


class HomeUser extends React.Component{
    constructor(probs) {
        super(probs);
        this.loadTermineToday = this.loadTermineToday.bind(this);
        this.state = {
            
            loadTermineToday: {
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
                }
            },
            termin: undefined
        }
    }
    componentDidMount() {
        window.addEventListener('load', this.loadTermineToday);
    }

    componentWillUnmount() { 
        window.removeEventListener('load', this.loadTermineToday);
    }

    loadTermineToday(){
        var today = new Date();
        var monthtoday = today.getUTCMonth(); 
        var daytoday = today.getUTCDate();
        var yeartoday = today.getUTCFullYear();
        fetch("https://vorlesungsplaner.herokuapp.com/termine/dozenten/" + getCookie("DozId"), {
            method: "GET",
            headers: {
                "authorization": "Bearer " + getCookie("token")
            }
        })
        .then(dataWrappedByPromise => dataWrappedByPromise.json())
        .then(res => {
            this.setState({
                loadTermineToday: res
            });

            for (let i=0; i < this.state.loadTermineToday.length; i++){
                var datum = new Date(this.state.loadTermineToday[i]["terDatum"]);
                var monthdatum = datum.getUTCMonth(); 
                var daydatum = datum.getUTCDate();
                var yeardatum = datum.getUTCFullYear();
                if(yeardatum == yeartoday && monthdatum == monthtoday && daydatum == daytoday){
                    
                    this.setState({
                        termin: true
                    });
                    //Elemente laden
                    //Heute sind folgende Veranstaltungen:
                    var termin0 = document.createElement("div");
                    termin0.className = "termin";
                    termin0.innerHTML = this.state.loadTermineToday[i]["terVonUhrzeit"] + ' - ' + this.state.loadTermineToday[i]["terBisUhrzeit"] + 
                                        '<br/>Raum: ' + this.state.loadTermineToday[i]["raumNr"]+ '<br/>' +
                                        this.state.loadTermineToday[i]["vorlesungen"]["vorName"] + '<br/>' + this.state.loadTermineToday[i]["semester"]["kurs"]["kurBezeichnung"];

                    document.getElementById("heuteterminehier").appendChild(termin0);
                }

                
            }

            if(this.state.termin == undefined){
                var rahmen = document.createElement("div");
                rahmen.className = "center";

                var kasten = document.createElement("div");
                kasten.id = "zitatTermine"
                kasten.innerHTML = "<cite>Es sind keine Veranstaltungen für heute geplant.</cite>"
                rahmen.appendChild(kasten);
                document.getElementById("heuteterminehier").removeChild(document.getElementById("heuteVer"));
                document.getElementById("heuteterminehier").appendChild(rahmen);
            }
  
        })
        .catch(err => {
            console.log(err);
        });
        
    }
    render() {
        return(
            <div id="begruessung">
                 <div className="content" id="begruessung2">
                    <a>
                        <h1 className="display-4">Willkommen {getCookie("user")}!</h1>
                        <hr></hr>
                    </a>
                    <div class="center" id="heuteterminehier">
                        <div id="heuteVer">Heute sind folgende Veranstaltungen:</div>
                        
                    </div>
                            
                </div>
                
            </div>
        );
    }

}

class Termine extends React.Component{

}


export { Home, HomeUser };