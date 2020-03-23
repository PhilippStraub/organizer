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
                    <form onSubmit={this.handleSubmit} id="kurse">
                        <div className="inputfields">
                            <div className="form-row">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupPrepend2">
                                        +
                                    </span>
                                    </div>
                                    <input type="text" className="form-control" name="kurs" placeholder="Kurs" required />
                                </div>
                            </div>
                        </div>
                    </form>

                    <form onSubmit={this.handleSubmit}>
                        <div className="inputfields">
                            <div className="form-row">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupPrepend2">
                                        +
                                    </span>
                                    </div>
                                    <input type="text" className="form-control" name="semester" placeholder="Semester" required />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                
                <div className="content">
                   
                          
                </div>
                
            </div>

        );
        
      }

}


export default Kurse;