import React, {Component} from 'react';
import { Route, Switch } from "react-router-dom";
import Enter from "./Enter";
import News from "./News";
import NewsArticle from "./NewsArticle";
// import { getCookie } from "../../functions";


export default class Adminka extends Component {
    constructor(props){
        super(props);
        // console.log(props.location);

        // console.log(props.reduxStore);
        const whereAmI = (props.location.pathname).split('/');
        const isAdminka = whereAmI.pop();
        const { adminLogin } = props.reduxStore;
        // console.log(adminLogin);

        if(isAdminka !== 'adminka'){
            if(adminLogin === false){
                props.allFunctions('check-auth', {},(answ)=>{
                    // console.log(answ);
                    if(answ === false){
                        props.history.push('/adminka');
                    }else{}
                })
            }
        }
    }
    componentDidMount(){
        const main_header = document.getElementById('header');
        // console.log(main_header);
        main_header.classList.add('hide-by-admin');
        // main_header.style.zIndex = '-1';
        // main_header.style.opacity = '0';
    }
    componentWillUnmount(){
        // const main_header = document.getElementById('header');
        // console.log('asdasdasdasdasd12312312312');
        //
        // if(main_header.classList.contains('hide-by-admin')){
        //     main_header.classList.remove('hide-by-admin')
        // }
    }
    render() {
        // console.log(this.props);
        const { adminLogin } = this.props.reduxStore;
        const { history, allFunctions } = this.props;
        return (
            <div className="admin">
                {adminLogin ?
                    <div className="admin-header">
                        <ul>
                            <li onClick={()=>{
                                history.push('/adminka/news')
                            }}>Новости</li>

                            <li onClick={()=>{
                                const main_header = document.getElementById('header');
                                console.log('asdasdasdasdasd12312312312');

                                if(main_header.classList.contains('hide-by-admin')){
                                    main_header.classList.remove('hide-by-admin')
                                }
                                history.push('/')
                            }}>Вернуться На Сайт</li>

                            <li onClick={()=>{
                                // history.push('/adminka/news')
                                allFunctions('exit-auth',{}, (answ)=>{
                                    // console.log(answ);
                                    if(answ){
                                        history.push('/adminka');
                                    }
                                })
                            }}>Выход</li>
                        </ul>
                    </div>
                    :
                    ''
                }
                <Switch>
                    <Route exact path={`/adminka`} render={ props => <Enter
                        allFunctions={this.props.allFunctions}
                        adminLogin={this.props.reduxStore.adminLogin}
                        {...props}/>}
                    />

                    <Route exact path={`/adminka/news`} render={ props => <News
                        allFunctions={this.props.allFunctions}
                        adminLogin={this.props.reduxStore.adminLogin}
                        news={this.props.reduxStore.news}
                        {...props}/>}
                    />

                    <Route exact path={`/adminka/news/:id`} render={ props => <NewsArticle
                        allFunctions={this.props.allFunctions}
                        adminLogin={this.props.reduxStore.adminLogin}
                        news={this.props.reduxStore.news}
                        {...props}/>}
                    />


                    <Route render={ props => <h1>Not found</h1>}/>
                </Switch>
            </div>
        )
    }
}