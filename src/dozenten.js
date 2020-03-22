import React from 'react';
import ReactDOM from 'react-dom';
import Template from './home';
import './home.css';

// ReactDOM.render(<Template />, document.getElementById('root'));
// ReactDOM.render(<NavItemsDozenten />, document.getElementById('navbarNav'));
// ReactDOM.render(<ContentDozenten />, document.getElementById('anchor'));

class NavItemsDozenten extends React.Component{
    render() {
        return(
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="#">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Kurse</a>
                </li>
                <li className="nav-item active">
                    <a className="nav-link" href="#">Dozenten</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Vorlesungen</a>
                </li>
            </ul>
        )
    }
}

class ContentSmallDozenten extends React.Component{    
    render() {
        return(
            <div>

            </div>
            
        );
        
      }
}

class ContentDozenten extends React.Component{    
    render() {
        return(
            <div>
                <div className="content">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                                
                </div>
                <div className="content">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                               
                </div>
            </div>
        );
        
      }

}

export {ContentSmallDozenten, ContentDozenten, NavItemsDozenten};