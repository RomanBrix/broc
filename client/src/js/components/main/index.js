import React, {Component} from 'react';
import Intro from "./Intro";
import About from "./About";
import Start from "./Start";
import News from "./News";
import Help from "./Help";

export default class Main extends Component {
    constructor(props){
        super(props);
        this.props.animateScroll(document.scrollingElement || document.documentElement);
        props.allFunctions('all-news'); // Download all news from database
    }

    render() {
        const { reduxStore } = this.props;
        // console.log(reduxStore);
        // test
        return (
            <div className="main">
                {/*<button onClick={()=>{*/}
                    {/*allFunctions('set-default-val', {},()=>{});*/}
                {/*}}>SET DEF VALUE</button>*/}
                <Intro />
                <About/>
                <Start/>
                <Help/>
                <News news={reduxStore.news}/>
            </div>
        )
    }



    componentWillUnmount() {
        // window.scrollTo(0,0);
        // this.props.animateScroll(document.scrollingElement || document.documentElement);
    }
}