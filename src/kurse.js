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
    constructor() {
        super();
        this.handleSubmitKurs = this.handleSubmitKurs.bind(this);
    }
    
    handleSubmitKurs(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        var object = {};
        data.forEach(function(value, key){
            object[key] = value;
        });
        var json = JSON.stringify(object);
        console.log(json);
        
        fetch('http://localhost:8080/kurs', {
          method: 'POST',
          headers: {
            "content-type": "application/json",
            "authorization": "Bearer " + getCookie("token")
          },
          body: json,
        }).then((res) => {
          if(res.ok){
            //return response.json();
          }else{
            
          }
        }).catch((err) => {
          console.log(err);
        });
    }

    handleSubmitSemester(event){
        alert("jo");
    }

    render() {
        return(
            <div>
                <div id="add">
                    <form onSubmit={this.handleSubmitKurs} id="kurs" name="Kursform">
                        <div className="inputfields">
                            <div className="form-row">
                                <div className="input-group" id="inp-g">
                                    <div className="input-group-prepend" id="inp">
                                        <span className="input-group-text" id="inputGroupPrepend2">
                                            +
                                        </span>
                                    </div>
                                    <input type="text" className="form-control" name="kurBezeichnung" placeholder="Kurs" required />
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
                                    <input type="text" className="form-control" name="sem_bez" placeholder="Semester" required />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                
                <div className="content" id="search">
                    <h1 className="display-4">Termine</h1>
                    <hr></hr>
                    <form>
                        <div className="row">
                            <div className="col" id="searchKurs">
                                <input type="text" className="form-control" name="kurs" placeholder="Kurs" id="inputKurs" />
                            </div>
                            <div className="col" id="searchSemester">
                            <   input type="text" className="form-control" name="semester" placeholder="Semester" id="inputSemester" />
                            </div>
                        </div>
                    </form>
                   
                          
                </div>
                
            </div>

        );
        
      }

}


export default Kurse;