import React from 'react';
// import ReactDOM from 'react-dom';
import './home.css';
import user from './data/person.svg';
import ContentSmall from './dozenten.js';

// ReactDOM.render(<Template />, document.getElementById('root'));
// ReactDOM.render(<NavItems />, document.getElementById('navbarNav'));
// ReactDOM.render(<Content />, document.getElementById('anchor'));

class NavItemsHome extends React.Component{
    render() {
        return(
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link" href="#">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Kurse</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Dozenten</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Vorlesungen</a>
                </li>
            </ul>
        )
    }
}


class Template extends React.Component{
    //Template which we will import in other views to display content.
    //this component needs an anchor to add components in the inside.
    render() {
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    
                    <a className="navbar-brand" href="#">
                        <img src="./logo.png" width="30" height="30" className="d-inline-block align-top" id="logo" alt="DHBW" />
                        DHBW <span id="stuggi">Stuttgart</span>
                    </a>
                                      
                                       
                    <div className="collapse navbar-collapse" id="navbarNav">
                        
                    </div>
                    <div id="user">
                        <img src={user} id="usericon" alt="" /> Nutzer
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </nav>
                <div>
                    Easteregg
                </div>
                
                <div id="anchor">
                    
                </div>
            </div>

         
        );
        
      }

}

class ContentHome extends React.Component{
    //Later there will be a .js for each header in menu like Dozenten, Termine, etc.
    //These .js Files will have two different main components: One full and one shorter view
    //the export default will always be the shorter version
    //that way we're able to include them here in our home view but also seperate them.
    render() {
        return(
            <div id="">
                <div className="content" id="dozenten">
                    <a href="#">
                        <h1 className="display-4">Dozenten</h1>
                        <hr></hr>
                    </a>
                
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                            
                </div>
                <div className="content" id="termine">
                    <a href="#">
                        <h1 className="display-4">Termine</h1>
                        <hr></hr>
                    </a>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                            
                </div>
            </div>

        );
        
      }

}


export {NavItemsHome,Template,ContentHome}