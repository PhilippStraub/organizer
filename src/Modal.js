import React from "react";
import './Modal.css';
import './kurse.css'



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


class ChangePwModal extends React.Component{
    constructor() {
        super();
        this.persDaten = this.persDaten.bind(this);
    }

    persDaten(event){
        event.preventDefault();
        const data = new FormData(event.target);
        var object = {};
        data.forEach(function(value, key){
            object[key] = value;
        });

        var jsonArray = {};
        jsonArray["dozId"] = getCookie("DozId");
        jsonArray["dozVorname"] =  object["dozVorname"];
        jsonArray["dozNachname"] = object["dozNachname"];
        jsonArray["dozMail"] = object["dozMail"];
        jsonArray["dozTel"] = object["dozTel"];
        jsonArray["dozMobil"] = object["dozMobil"];
        jsonArray["password"] = object["password"];
        var json = JSON.stringify(jsonArray);

        fetch("https://vorlesungsplaner.herokuapp.com/dozenten/update/"+ getCookie("DozId"), {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + getCookie("token")
        },
        "body":json
        })
        .then(response => {
            if(response.ok){
                document.getElementById("PwModalClose").click();
            }
        })
        .catch(err => {
        console.log(err);
        });


    }


    render() {
        return(
            <div class="modal fade" id="ChangePwModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ChangePwModalModalLabel">Nutzer Details</h5>
                    <button type="button" id="PwModalClose" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form onSubmit={this.persDaten}>
                        <div className="input-group" id="inputgroop_changeemail">
                                <input type="text" className="form-control" id="neuesPw" name="dozMail" value= {getCookie("user")} required></input>
                        </div>
                        
                        <div class="form-row" id="changename">
                                <div class="col">
                                <input type="text" id="VornameDoz" class="form-control" name="dozVorname" placeholder="Vorname"></input>
                                </div>
                                <div class="col">
                                <input type="text" id="NachnameDoz" class="form-control" name="dozNachname" placeholder="Nachname"></input>
                                </div>
                        </div>
                        <div class="form-row" id="changetel">
                                <div class="col">
                                <input type="tel" id="telDoz" class="form-control" name="dozTel" placeholder="Telefon"></input>
                                </div>
                                <div class="col">
                                <input type="tel" id="mobDoz" class="form-control" name="dozMobil" placeholder="Mobil"></input>
                                </div>
                        </div>
                        <div className="input-group" id="inputgroop_changepw">
                            <input type="password" className="form-control" id="neuesPw" name="password" placeholder="Neues Password" required />
                            
                        </div>
                        <button className="btn btn-danger d-flex justify-content-center" type="submit" id="modalbuttonsredpd"> 
                            Änderungen abschicken
                        </button>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Abbrechen</button>
                </div>
                </div>
            </div>
        </div>

        );
    }
};

export default ChangePwModal;