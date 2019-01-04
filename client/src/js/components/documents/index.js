import React, {Component} from 'react';
import Privacy from './Privacy';
import Agreement from './Agreement';
import {Route, Switch} from "react-router-dom";
import {animateScroll} from "../../functions";
// import {CSSTransition} from "react-transition-group";

export default class Documents extends Component {
    constructor(props){
        super(props);
        this.state = {
            miniHead: {
                agreement: props.match.params.doc === 'agreement',
                privacy: props.match.params.doc === 'privacy',
            }
        }
        this.props.animateScroll(document.scrollingElement || document.documentElement);

        // console.log(props);
    }

    getContent(){
        // const { miniHead } = this.state;

        switch (this.props.match.params.doc) {
            case 'agreement':
                return <Agreement/>;

            case 'privacy':
                return <Privacy/>;

            default: return <Privacy/>;
        }
    }

    render() {
        const { miniHead } = this.state;
        const {  history } = this.props;
        // console.log(miniHead);

        return (
            <div className="documents">
                <div className="photo-layer" style={{backgroundImage: `url(/src/documents/bg.png)`}}/>
                <div className="width-layer">
                    <div className="container">
                        <div className="miniHead">
                           <div className="nav-block" onClick={()=>{
                             history.push('/documents/agreement')
                           }}>
                               <div className={`dot ${miniHead.agreement ? 'active-dot' : ''}`}/>
                               <div className="nav-name">Пользовательское соглашение</div>
                           </div>

                            <div className="nav-block" onClick={()=>{
                                history.push('/documents/privacy')
                            }}>
                               <div className={`dot ${miniHead.privacy ? 'active-dot' : ''}`}/>
                               <div className="nav-name">Политика конфиденциальности</div>
                           </div>
                        </div>

                        {/*{this.getContent()}*/}
                        <Switch>
                            <Route exact path={`/documents/agreement`} render={ props => <Agreement allFunctions={this.props.allFunctions} animateScroll={animateScroll}  {...props}/>}/>
                            <Route exact path={`/documents/privacy`} render={ props => <Privacy allFunctions={this.props.allFunctions} animateScroll={animateScroll}  {...props}/>}/>
                            <Route render={ props => <h1>Not found</h1>}/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}