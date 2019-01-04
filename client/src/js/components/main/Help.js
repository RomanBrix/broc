import React, {Component} from 'react';

export default class Help extends Component {
    render() {
        return (
            <div className="intro-help">
                <div className="width-layer">
                    <h2>Нужна помощь?</h2>
                    <div className="help-container">
                        <div className="left">
                            <p>Не можете разобратся с системой? <br/>Есть сложности с сайтом?<br/> Есть вопросы?</p>
                            <div className="btn-faq">Здесь есть ответы!</div>
                        </div>
                        <div className="center">
                            <span>Или</span>
                        </div>
                        <div className="right">
                            {/*<p>Все еще остались вопросы?</p>*/}
                            <p>Оставьте Ваш номер и мы Вам поможем!</p>
                            <div className="get-call">
                                <input type="text" placeholder={'номер телефона'}/>
                                <div className="btn-get-call">
                                    Заказать Звонок
                                </div>
                            </div>
                            <div className="btn-mail">Напишите нам письмо</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}