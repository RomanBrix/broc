import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { allFunctions } from './redux/front/front-actions';
import { animateScroll } from "./functions";
import Main from "./components/main";
import About from "./components/about";
import Documents from "./components/documents";
import Header from "./components/layers/Header";
import Adminka from "./components/admin";
import Footer from "./components/layers/Footer";
import Contacts from "./components/contacts";
import News from "./components/news";


class App extends Component {
   constructor(props){
       super(props);
       this.state = {

       };
       document.title = 'BroCompany';
   }

  render() {
      const reduxStore = this.props.front.toJS();
      // console.log(this.props);
      // console.log(reduxStore);

      return (
          <Router>
              <Route render={( { location } ) =>
                  <div className="App">
                      <Header/>
                      <TransitionGroup>
                          <CSSTransition
                              timeout={300}
                              transitionEnterTimeout={300}
                              transitionLeaveTimeout={300}
                              classNames={'fade'}
                              key={location.key}
                              // transitionAppear={true}
                              // transitionAppearTimeout={300}
                              // transitionEnter={false}
                              // transitionLeave={false}
                          >
                              <Switch location={location}>
                                  <Route exact path={`/`} render={ props => <Main allFunctions={this.props.allFunctions}  animateScroll={animateScroll} reduxStore={reduxStore} {...props}/>}/>
                                  <Route path={`/adminka`} render={ props => <Adminka allFunctions={this.props.allFunctions}  reduxStore={ reduxStore } animateScroll={animateScroll} {...props}/>}/>

                                  <Route exact path={`/about`} render={ props => <About allFunctions={this.props.allFunctions} animateScroll={animateScroll}  {...props}/>}/>

                                  <Route exact path={`/news`} render={ props => <News reduxStore={reduxStore} allFunctions={this.props.allFunctions} animateScroll={animateScroll}  {...props}/>}/>

                                  <Route exact path={`/contacts`} render={ props => <Contacts allFunctions={this.props.allFunctions} animateScroll={animateScroll}  {...props}/>}/>
                                  <Route exact path={`/documents/:doc`} render={ props => <Documents allFunctions={this.props.allFunctions} animateScroll={animateScroll}  {...props}/>}/>
                                  <Route render={ props => <h1>Not found</h1>}/>
                              </Switch>
                          </CSSTransition>
                      </TransitionGroup>
                      <Footer/>
                  </div>
              }/>
          </Router>
    );
  }
}











//get redux store and connect
const mapStateToProps = ( state ) => {
    return ({
        front: state.front
    })
};
export default connect(
    mapStateToProps,
    {
        allFunctions
    })(App);
