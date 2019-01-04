import React, {Component} from 'react';
import SVGlogo from "../main/SVGlogo";
import Tilt from "react-tilt";

export default class Contacts extends Component {

    onSelectInput(label, target){
        // label.style.top = '';
        // label.style.left = '0px'
        if(target.value.length === 0) {
            label.classList.toggle('label-active');
        }
    }

    render() {
        return (
            <div className="contacts" style={{backgroundImage: `url(./src/main/rectangle.svg)`}}>
                <div className="width-layer">
                    <div className="left">
                        <p>You can easily write to us right now and we will gladly read your message and can be answered if we want</p>
                        <div className="contact-form">
                            <div className="box-input">
                                <label htmlFor="name" ref={'labelName'}>Имя</label>
                                <input type="text" id='name' ref='name' placeholder={'Миллионер Вилли'}
                                       onFocus={({target})=>{
                                           this.onSelectInput(this.refs.labelName, target);
                                       }}
                                       onBlur={({target})=>{
                                           this.onSelectInput(this.refs.labelName, target);
                                       }}
                                />
                            </div>
                            <div className="box-input">
                                <label htmlFor="mail" ref={'labelMail'}>E-mail</label>
                                <input type="text" id='mail' ref='mail' placeholder={'bestmail@gmail.com'}
                                       onFocus={({target})=>{
                                           this.onSelectInput(this.refs.labelMail, target);
                                       }}
                                       onBlur={({target})=>{
                                           this.onSelectInput(this.refs.labelMail, target);
                                       }}

                                />
                            </div>
                            <div className="box-area">
                                <label htmlFor="msg" ref={'labelMsg'}>Ваше сообщение</label>
                                <textarea name="msg" id="msg" ref={'msg'} placeholder={'Здравствуйте, хочу спросить...'} onChange={({target})=>{
                                    const scrollHeight = target.scrollHeight;
                                    const heightElem = target.offsetHeight;
                                    console.log(`scroll height: ${target.scrollHeight}`);
                                    console.log(heightElem);
                                    if(+heightElem < 150) {
                                        if (+heightElem - +scrollHeight === 2) {
                                            console.log('ровно!')
                                        } else {
                                            console.log(+heightElem - +scrollHeight);
                                            const pxTo = (+heightElem + 2) + Math.abs(+heightElem - +scrollHeight) ;
                                            // + ()
                                            console.log('so: ' + pxTo);
                                            target.style.height = `${pxTo}px`;
                                        }
                                    }
                                    if(target.value.length < 1) {
                                        target.style.height = `40px`;

                                    }
                                }}
                                          onFocus={({target})=>{
                                              this.onSelectInput(this.refs.labelMsg, target);
                                          }}
                                          onBlur={({target})=>{
                                              this.onSelectInput(this.refs.labelMsg, target);
                                          }}
                                />

                            </div>
                        </div>
                        <div className="btn-send">Отправить</div>
                    </div>
                    <div className="right">
                        <Tilt options={{
                            max : 20,
                            scale: 1,
                            speed:          1000,    // Speed of the enter/exit transition
                            transition:     false,   // Set a transition on enter/exit.
                            axis:           null,
                            reset:          false,
                            reverse:        true,
                            perspective:    900,
                        }} style={{ height: '100%', width: '100%' }} >
                            <SVGlogo />
                        </Tilt>
                    </div>
                </div>
            </div>
        )
    }
}