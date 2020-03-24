import React from 'react';
import './kurse.css';


class Kurse extends React.Component{
    //Later there will be a .js for each header in menu like Dozenten, Termine, etc.
    //These .js Files will have two different main components: One full and one shorter view
    //the export default will always be the shorter version
    //that way we're able to include them here in our home view but also seperate them.

    render() {
        return(
            <div>
                <div id="add">
                    <form onSubmit={this.handleSubmit} id="kurs">
                        <div className="inputfields">
                            <div className="form-row">
                                <div className="input-group" id="inp-g">
                                    <div className="input-group-prepend" id="inp">
                                    <span className="input-group-text" id="inputGroupPrepend2">
                                        +
                                    </span>
                                    </div>
                                    <input type="text" className="form-control" name="addKurs" placeholder="Kurs" required />
                                </div>
                            </div>
                        </div>
                    </form>

                    <form onSubmit={this.handleSubmit} id="semester">
                        <div className="inputfields">
                            <div className="form-row">
                                <div className="input-group" id="inp-g">
                                    <div className="input-group-prepend" id="inp">
                                    <span className="input-group-text" id="inputGroupPrepend2">
                                        +
                                    </span>
                                    </div>
                                    <input type="text" className="form-control" name="addSemester" placeholder="Semester" required />
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
                                <input type="text" className="form-control" name="kurs" placeholder="Kurs" />
                            </div>
                            <div className="col" id="searchSemester">
                            <   input type="text" className="form-control" name="semester" placeholder="Semester" />
                            </div>
                        </div>
                    </form>
                   
                          
                </div>
                
            </div>

        );
        
      }

}


export default Kurse;