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

function getDozByMail(mail){
    fetch("https://vorlesungsplaner.herokuapp.com/dozenten/0", {
    "method": "GET",
    "headers": {
        "authorization": "Bearer" + getCookie("token")
    }
    })
    .then(response => {
    console.log(response);
    })
    .catch(err => {
    console.log(err);
    error(1)
    });
}

function error(errorcode){
    switch (errorcode){
        case 1:
            alert('Es ist ein Fehler aufgetreten! Bitte versuchen Sie es erneut.');
        break;

        case 2:
            alert('Das Passwort wurde erfolgreich geändert.');
        break;

        case 3:
            alert('Die Nutzer Details wurden erfolgreich geändert');
        break;
    }
}


class ChangePwModal  extends React.Component{
    render() {
        return(
            <div className="modal fade bd-example-modal-lg" id="ChangePwModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="false" onload='getDozByMail({getCookie("user")})'>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ChangePwModalModalLabel">Nutzer Details</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                            <div className="input-group" id="inputgroop_changeemail">
                                    <input type="email" className="form-control" id="neuesPw"
                                           placeholder= {getCookie("user")}></input>
                            </div>
                           
                            <div class="form-row" id="changename">
                                    <div class="col">
                                    <input type="text" class="form-control" placeholder="Vorname"></input>
                                    </div>
                                    <div class="col">
                                    <input type="text" class="form-control" placeholder="Nachname"></input>
                                    </div>
                            </div>
                            <div class="form-row" id="changetel">
                                    <div class="col">
                                    <input type="tel" class="form-control" placeholder="Telefon"></input>
                                    </div>
                                    <div class="col">
                                    <input type="tel" class="form-control" placeholder="Mobil"></input>
                                    </div>
                            </div>
                                <button className="btn btn-danger d-flex justify-content-center" type="button" id="modalbuttonsredpd"
                                                > Pesönliche Daten Änderm
                                        </button>

                                <div className="input-group" id="inputgroop_changepw">
                                    <input type="password" className="form-control" id="neuesPw"
                                           placeholder="Neues Password"></input>
                                   
                                </div>
                                <div className="input-group" id="inputgroop_changepw">
                                    <input type="password" className="form-control" id="neuesPwBestätigen"
                                           placeholder="Neues Password Bestätigen"></input>
                                </div>
                                <button type="button" className="btn btn-danger d-flex justify-content-center" id="modalbuttonsredpw">Password ändern</button>
                            
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Schließen</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default ChangePwModal;
