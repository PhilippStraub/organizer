import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import './index.css';
import user from './data/person.svg';
import logout from './data/logout.svg';
import Login from './Login';
import { Home, HomeUser } from './home';
import Kurse from './kurse';
import Dozenten from './dozenten';
import ChangePwModal from './Modal';
import Termine from './termine'


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

function setCookie(cname, cvalue, exhours) {
    var d = new Date();
    d.setTime(d.getTime() + (exhours*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}




class NavItemsHome extends React.Component{
    render() {
        return(
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/kurse'} className="nav-link">Kurse</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/dozenten'} className="nav-link">Dozenten</Link>
                </li>
            </ul>
        )
    }
}

class NavItemsKurse extends React.Component{
    render() {
        return(
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item active">
                    <Link to={'/kurse'} className="nav-link">Kurse</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/dozenten'} className="nav-link">Dozenten</Link>
                </li>
            </ul>
        )
    }
}

class NavItemsDozenten extends React.Component{
    render() {
        return(
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/kurse'} className="nav-link">Kurse</Link>
                </li>
                <li className="nav-item active">
                    <Link to={'/dozenten'} className="nav-link">Dozenten</Link>
                </li>
            </ul>
        )
    }
}


class Template extends React.Component{
    //Template which we will import in other views to display content.
    //this component needs an anchor to add components in the inside.
    constructor() {
        super();
        this.logoutUser = this.logoutUser;
        this.getData = this.getData.bind(this);
        this.state = {
            doz: {
                "dozId": "",
                "dozVorname": "",
                "dozNachname": "",
                "dozMail": "",
                "dozTel": "",
                "dozMobil": ""
            }
        }
      }

    getData(){
        fetch("https://vorlesungsplaner.herokuapp.com/dozenten/" + getCookie("DozId"), {
            "method": "GET",
            "headers": {
                "authorization": "Bearer " + getCookie("token")
            }
        })
        .then(dataWrappedByPromise => dataWrappedByPromise.json())
        .then((response) => {
            console.log(response);
            this.setState({
                doz: response
            });
            document.getElementById("VornameDoz").value = this.state.doz["dozVorname"];
            document.getElementById("NachnameDoz").value = this.state.doz["dozNachname"];
            document.getElementById("telDoz").value = this.state.doz["dozTel"];
            document.getElementById("mobDoz").value = this.state.doz["dozMobil"];
        })
        .catch((err) => {
            console.log(err);
        })
    }
    logoutUser(){
        document.cookie = "token=; DozId=; path=/;";
        window.location.reload();
    }
    render() {
        return(
            <div>
                <Router>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">

                        <a className="navbar-brand">
                            <img src="./logo.png" width="30" height="30" className="d-inline-block align-top" id="logo" alt="DHBW" />
                            DHBW <span id="stuggi">Stuttgart</span>
                        </a>




                            <div className="collapse navbar-collapse" id="navbarNav">
                                <Switch>
                                    <Route exact path='/' component={NavItemsHome} />
                                    <Route exact path='/kurse' component={NavItemsKurse} />
                                    <Route exact path='/dozenten' component={NavItemsDozenten} />
                                </Switch>
                            </div>

                            <div id="user">
                                <button id="userbutton" onClick={this.getData} data-toggle="modal" data-target="#ChangePwModal">
                                    <img src={user} id="usericon" alt="" />
                                </button>
                            
                                {getCookie("user")}
                                <img src={logout} id="logout" alt="logout" onClick={this.logoutUser} />
                            </div>

                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                    </nav>

                    <div id="anchor">
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/kurse' component={Kurse} />
                        <Route path='/dozenten' component={Dozenten} />
                    </Switch>
                    </div>
                    <ChangePwModal />
                </Router>

            </div>


        );

      }

}

class NavItemsHomeUser extends React.Component{
    render() {
        return(
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/termine'} className="nav-link">Termine</Link>
                </li>
            </ul>
        )
    }
}

class NavItemsTermineUser extends React.Component{
    render() {
        return(
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item active">
                    <Link to={'/termine'} className="nav-link">Termine</Link>
                </li>
            </ul>
        )
    }
}


class TemplateUser extends React.Component{
    //Template which we will import in other views to display content.
    //this component needs an anchor to add components in the inside.
    constructor() {
        super();
        this.logoutUser = this.logoutUser;
        this.getData = this.getData.bind(this);
        this.state = {
            doz: {
                "dozId": "",
                "dozVorname": "",
                "dozNachname": "",
                "dozMail": "",
                "dozTel": "",
                "dozMobil": ""
            }
        }
    }

    getData(){
        fetch("https://vorlesungsplaner.herokuapp.com/dozenten/" + getCookie("DozId"), {
            "method": "GET",
            "headers": {
                "authorization": "Bearer " + getCookie("token")
            }
        })
        .then(dataWrappedByPromise => dataWrappedByPromise.json())
        .then((response) => {

            this.setState({
                doz: response
            });
            document.getElementById("VornameDoz").value = this.state.doz["dozVorname"];
            document.getElementById("NachnameDoz").value = this.state.doz["dozNachname"];
            document.getElementById("telDoz").value = this.state.doz["dozTel"];
            document.getElementById("mobDoz").value = this.state.doz["dozMobil"];
        })
        .catch((err) => {
            console.log(err);
        })
    }
    logoutUser(){
        document.cookie = "token=; DozId=; path=/;";
        window.location.reload();
    }
    render() {
        return(
            <div>
                <Router>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">

                        <a className="navbar-brand">
                            <img src="./logo.png" width="30" height="30" className="d-inline-block align-top" id="logo" alt="DHBW" />
                            DHBW <span id="stuggi">Stuttgart</span>
                        </a>




                            <div className="collapse navbar-collapse" id="navbarNav">
                                <Switch>
                                    <Route exact path='/' component={NavItemsHomeUser} />
                                    <Route exact path='/termine' component={NavItemsTermineUser} />
                                </Switch>
                            </div>
                            <div id="user">
                                <button id="userbutton" onClick={this.getData} data-toggle="modal" data-target="#ChangePwModal">
                                    <img src={user} id="usericon" alt="" />
                                </button>
                                {getCookie("user")}
                                <img src={logout} id="logout" alt="logout" onClick={this.logoutUser} />
                            </div>

                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                    </nav>

                    <div id="anchor">
                    <Switch>
                        <Route exact path='/' component={HomeUser} />
                        <Route path='/termine' component={Termine} />
                    </Switch>
                    </div>
                    <ChangePwModal />
                </Router>

            </div>


        );

      }

}



class Index extends React.Component{
    //Template which we will import in other views to display content.
    //this component needs an anchor to add components in the inside.
    constructor() {
        super();
        this.isAuth = this.isAuth;
        this.isAdmin = this.isAdmin;
        this.getDozId = this.getDozId;
        this.state = {
            doz: {
                "dozId": "",
                "dozVorname": "",
                "dozNachname": "",
                "dozMail": "",
                "dozTel": "",
                "dozMobil": ""
            },
            abgeholt: undefined
            
        }
    }

    isAuth(){
        if(getCookie("token").length<5){
            return false;

        } else {
            return true;

        }
    }
    isAdmin(){
        if(getCookie("user") == "Admin" || getCookie("user") == "bimazubute@dhbw-stuttgart.de"){
            return true;
        } else{
            return false;
        }
    }

    getDozId(){
        fetch("https://vorlesungsplaner.herokuapp.com/dozenten/0", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + getCookie("token")
            }
        })
        .then(dataWrappedByPromise => dataWrappedByPromise.json())
        .then(response => {
            
                this.setState({
                    doz: response
                });
                
                for (let i=0; i < this.state.doz.length; i++){
                    
                    if(this.state.doz[i]["dozMail"] == getCookie("user")){
                        setCookie("DozId", this.state.doz[i]["dozId"], 5);
                    }
                }
                this.setState({
                    abgeholt: true
                });
        })
        .catch(err => {
        console.log(err);
        });
    }

    render() {
        if(this.isAuth()){
            //Authentiziert
            if(this.state.abgeholt == undefined){
                this.getDozId();
            }
            if(this.isAdmin()){

                
                //Admin-Ansicht
                return(
                    <div>
                        <Router>
                            <Switch>
                                <Route exact path='/login' component={Login} />
                                <Route exact path='/' component={Template} />
                                <Route exact path='/kurse' component={Template} />
                                <Route exact path='/dozenten' component={Template} />
                                <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
                    </div>
                );
            } else {
                //Dozentenansicht

                return(
                    <div>
                        <Router>
                            <Switch>
                                <Route exact path='/login' component={Login} />
                                <Route exact path='/' component={TemplateUser} />
                                <Route exact path='/termine' component={TemplateUser} />
                                <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
                    </div>

                //2. Template generieren

                //1. Seite - 
                //2. Seite - Dashboard das Termine anzeigt, die zu bestätigen sind -> Muss auch alt. Uhrzeit senden können + Kalender muss mit Terminen des Doz gefüllt werden
                );
            }
        } else {
            return(
                <div>
                    <Router>
                        <Switch>
                            <Route exact path='/login' component={Login} />
                            <Redirect from="*" to="/login" />
                        </Switch>
                    </Router>
                </div>
            );
        }
    }
}


ReactDOM.render(<Index />, document.getElementById('root'));





