import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AllNews from "./AllNews";


export default class News extends Component {

    render() {
        // console.log(this.props);
        const { allFunctions, animateScroll, reduxStore } = this.props;

        return (
            <Switch>
                <Route exact path={`/news`} render={ props => <AllNews allFunctions={allFunctions} reduxStore={ reduxStore } animateScroll={animateScroll}  {...props}/>}/>
                <Route exact path={`/news/:id`} render={ props => <News allFunctions={allFunctions} animateScroll={animateScroll}  {...props}/>}/>

                <Route render={ props => <h1>Not found</h1>}/>
            </Switch>
        )
    }
}