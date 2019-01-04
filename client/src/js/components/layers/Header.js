import React, {Component} from 'react';
import {  NavLink } from "react-router-dom";

export default class Header extends Component {
    render() {
        return (
            <div className="header" id={'header'}>
                <div className="width-layer">
                    <div className="logo">
                        <NavLink to={'/'}>
                            <img src="/src/main/dots.png" className={'dots'} alt=""/>
                            <span>EXCHANGE</span>
                        </NavLink>
                    </div>
                    <ul className={'menu'}>
                       <li><NavLink to={'/'}>С чего начать</NavLink></li>
                        <li><NavLink to={'/about'}>О нас</NavLink></li>
                        <li><NavLink to={'/'}>Обмен</NavLink></li>
                        <li><NavLink to={'/'}>Торги</NavLink></li>
                        <li><NavLink to={'/news'}>Новости</NavLink></li>
                        <li><NavLink to={'/contacts'}>Контакты</NavLink></li>
                        <li className={'regestr'}><span>Регистрация</span></li>
                    </ul>
                </div>
            </div>
        )
    }
}