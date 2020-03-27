import React from 'react';
import ReactDOM from 'react-dom';
import key from './data/key.svg';
import user from './data/person.svg';
import './Login.css';

// ReactDOM.render(<Login />, document.getElementById('root'));

class Error extends React.Component{
  render() {
    return(
    <div className="alert alert-danger" id="error" role="alert">
      Ein Fehler ist aufgetreten.
    </div>
    );
    
  }

}

class Login extends React.Component {
  constructor() {
    super();
    this.autheticate = this.autheticate.bind(this);
  }

  autheticate(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    var object = {};
    data.forEach(function(value, key){
      object[key] = value;
    });
    var json = JSON.stringify(object);

    fetch('http://localhost:8080/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: json,
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }else{
        ReactDOM.render(<Error />, document.getElementById('field'));
      }
    })
    .then((data) => {
      if(data){
        var token;
        var user;
        Object.keys(data).forEach(key => { 
          user = key;
          token = data[key];  
        });
  
        function setCookie(cname, cvalue, exhours) {
          var d = new Date();
          d.setTime(d.getTime() + (exhours*60*60*1000));
          var expires = "expires="+ d.toUTCString();
          document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }
  
        setCookie("token", token, 5);
        setCookie("user", document.getElementById("nutzer").value, 5);
        
        window.location.replace("/");
        
      } else {

      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="header">
        
        </header>
        <main className="main">
          <div className="rahmenlogo"></div>
          <div className="login">
            
            <h1 className="display-4">Organizer</h1>
            <hr></hr>       
            

            <form onSubmit={this.autheticate} id="loginForm">
              <div className="inputfields">
                <div className="form-row" id="row">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroupPrepend2">
                        <img src={user} className="user" alt="" />
                      </span>
                    </div>
                    <input type="text" className="form-control" name="username" placeholder="Nutzer" id="nutzer" required />
                  </div>
                </div>

                <div className="form-row" id="row">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroupPrepend2">
                        <img src={key} className="key" alt="" />
                      </span>
                    </div>
                    <input type="password" className="form-control" name="password" placeholder="Passwort" required />
                  </div>
                </div>
              </div>
              <div id="field"></div>
              <button className="btn btn-danger" type="submit" href="/home">Anmelden</button>
            </form>

          </div>
        </main>
        <footer className="footer">

        </footer>
      </div>
    );
  }
}

export default Login;