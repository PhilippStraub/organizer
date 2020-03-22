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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    fetch('/api/form-submit-url', {
      method: 'POST',
      body: data,
    }).then((res) => {
      if(res.ok){
        //return response.json();
      }else{
        ReactDOM.render(<Error />, document.getElementById('field'));
      }
    }).catch((err) => {
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
            

            <form onSubmit={this.handleSubmit}>
              <div className="inputfields">
                <div className="form-row">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroupPrepend2">
                        <img src={user} className="user" alt="" />
                      </span>
                    </div>
                    <input type="text" className="form-control" name="username" placeholder="Nutzer" required />
                  </div>
                </div>

                <div className="form-row">
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