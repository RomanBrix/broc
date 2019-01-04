import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="width-layer">
                    <div className="footer-container">
                        <div className="logo">
                            <NavLink to={'/'}>
                                <img src="/src/main/dots.png" className={'dots'} alt=""/>
                                <span>EXCHANGE</span>
                            </NavLink>
                        </div>
                        <div className="links">
                            <ul>
                                <li> <NavLink to={'/'}>Торги</NavLink></li>
                                <li> <NavLink to={'/'}>Обмен</NavLink></li>
                                <li> <NavLink to={'/'}>С чего начать?</NavLink></li>
                                <li> <NavLink to={'/'}>Контакты</NavLink></li>
                            </ul>
                        </div>
                        <div className="more-info">
                            <ul>
                                <li>ИНФОРМАЦИЯ</li>
                                <li><NavLink to={'/'}>О нас</NavLink></li>
                                <li><NavLink to={'/'}>Новости</NavLink></li>
                            </ul>
                        </div>
                        <div className="more-documents">
                            <ul>
                                <li>Документы</li>
                                <li><NavLink to={'/documents/agreement'}>Пользовательское соглашение</NavLink></li>
                                <li><NavLink to={'/documents/privacy'}>Политика конфиденциальности</NavLink></li>
                            </ul>
                        </div>
                        <div className="socials">
                            <ul>
                                <li>ПОДПИСЫВАЙТЕСЬ НА НАС</li>
                                <li>
                                    <ol>
                                        {/*<li className='icon-instagram' ></li>*/}
                                        <li><i className='icon-instagram' /></li>
                                        <li><i className='icon-email-plane'/></li>
                                    </ol>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="copyright-container">
                        <i className='icon-copyright'/> 2018 Exchange. All rights reserved
                    </div>
                </div>
            </div>
        )
    }
}