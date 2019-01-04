import React, {Component} from 'react';
// import { Redirect } from "react-router-dom";

export default class Enter extends Component {
    constructor(props){
        super(props);
        props.allFunctions('check-auth', {},(answ)=>{
            console.log(answ);
            if(answ === false){
                // props.history.push('/adminka');
            }else{
                props.history.push('/adminka/news');
            }
        })

    }
    render() {
        const { allFunctions } = this.props;
        // if(this.props.adminLogin){
        //    return <Redirect to={'/adminka/news'} />
        // }
        return (
            <div className="enter">
                <div className="content">
                    <input type="text" placeholder={'login'} id={'login'} ref={'login'}/>
                    <input type="password" placeholder={'password'} id={'password'} ref={'password'}/>
                    <div className="btn-enter" onClick={()=>{
                        const { login, password } = this.refs;
                        allFunctions('admin-enter', {log: login.value, pass: password.value},(answ)=>{
                            // console.log(answ);
                            if(answ === true && this.props.adminLogin){
                                this.props.history.push('/adminka/news');
                            }
                            // console.log('is admin?- ' + this.props.adminLogin);
                        })
                    }}> Enter</div>
                </div>
            </div>
        )
    }
}