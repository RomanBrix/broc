import React, {Component} from 'react';
// import bitcoinLogo from './bitcoinLogo.svg';
import SVGlogo from './SVGlogo.js';
import Tilt from 'react-tilt'

export default class Intro extends Component {


    componentDidMount(){

    }
    render() {
        return (
            <div className="intro" style={{backgroundImage: `url(./src/main/mainLayer.svg)`}}>
                    <div className="width-layer">
                        <div className="left">
                            <img src={'/src/main/dots.png'} className={'dots'} alt=""/>
                            <h1>Cамый простой способ <br/>купить и продать криптовалюту</h1>
                            <p>Вы можете начать торговлю криптовалютой через Сервис Биржи Exchange в любой момент в любой точке мира. Для быстрой регистрации заполните ваш Email</p>
                            <div className="box-input">
                                <input type="text" placeholder={'Введите Ваш E-mail'}/>
                                <div className="btn-reg">Регестрация</div>
                            </div>
                        </div>
                        <div className="right">
                            {/*<img src={bitcoinLogo} alt="bitoc" ref={'levitation'}/>*/}
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
                        <div className="bottom">
                            <p>Сейчас покупают</p>
                            <div className="box-values">
                                <div className="values">
                                    <div className="name">Monero/USD</div>
                                    <div className="value">47,68</div>
                                </div>
                                <div className="values">
                                    <div className="name">Bitcoin/USD</div>
                                    <div className="value">3 908,19</div>
                                </div>
                                <div className="values">
                                    <div className="name">Litecoin/USD</div>
                                    <div className="value">47,78</div>
                                </div>
                                <div className="values">
                                    <div className="name">Ethereum/USD</div>
                                    <div className="value">670,25</div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}