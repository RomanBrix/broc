import React, {Component} from 'react';

export default class Start extends Component {
    scaleIn(target){

        if(!target.classList.contains('number')){
            if(!target.classList.contains('icon-check-mark') ) {
                return;
            }
        }


        const forCase = target.innerHTML;
        let ref = '';
        switch (forCase) {
            case '1':
                ref = this.refs.first;
                break;
            case '2':
                ref = this.refs.second;
                break;
            case '3':
                ref = this.refs.third;
                break;
            default:
                ref = this.refs.fourth;
                break;
        }
        ref.style.transform = "scale(1.1)"
    }
    scaleOut(target){
        if(!target.classList.contains('number')) return;

        const forCase = target.innerHTML;
        let ref = '';
        switch (forCase) {
            case '1':
                ref = this.refs.first;
                break;
            case '2':
                ref = this.refs.second;
                break;
            case '3':
                ref = this.refs.third;
                break;
            default:
                ref = this.refs.fourth;
                break;
        }
        ref.style.transform = "scale(1)"
    }

    render() {
        return (
            <div className="start">
                <div className="width-layer">
                    <h2>С чего начать?</h2>
                    <p>Вы можете начать торговлю криптовалютой через Exchange в любой момент, в любой точке мира.</p>
                    <div className="container">
                        <div className="start-map" onMouseOver={({target})=>{this.scaleIn(target)}} onMouseOut={({target})=>{ this.scaleOut(target)}}>
                            <div className="number">1</div>
                            <div className="number">2</div>
                            <div className="number">3</div>
                            <div className="number"><i className='icon-check-mark'/></div>
                        </div>
                        <div className="start-info">
                            <div className="info" ref={'first'}>
                                <h3>Регистрация</h3>
                                <p>Пройти регистрацию на Exchange.com</p>
                            </div>
                            <div className="info" ref={'second'}>
                                <h3>Подтверждения</h3>
                                <p>Подтвердите регистрацию через email.</p>
                            </div>
                            <div className="info" ref={'third'}>
                                <h3>Пополните ваш счет</h3>
                                <p>Пополнить счет, просто выбрав тот способ, который подходит вам больше всего.</p>
                            </div>
                            <div className="info" ref={'fourth'}>
                                <h3>Готово!</h3>
                                <p>Теперь, когда ваш аккаунт пополнен, вы можете начать торговлю на рынке.</p>
                            </div>
                        </div>
                        <div className="regestr">
                            <input type="text" placeholder={'Введите ваш Email'}/>
                            <div className="btn-reg">Регистрация</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}