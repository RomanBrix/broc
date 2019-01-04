import React, {Component} from 'react';

export default class About extends Component {
    constructor(props){
        super(props);
        this.props.animateScroll(document.scrollingElement || document.documentElement);
    }
    render() {
        return (
            <div className="about">
                <div className="img-layer" style={{backgroundImage: `url(./src/main/mainLayer.svg)`}}/>
                <div className="width-layer">
                    <div className="content">
                        <div className="left">
                            <div className="video">
                                <div className="btn-play">
                                    <i className='icon-play'/>
                                </div>
                                <img src="./src/about/photo.png" alt=""/>
                            </div>
                            <div className="text">
                                <p>The StarTribune doesn’t just hand out the responsibility of informing their community’s citizenry on a daily basis to just any fool that says they’d like a shot at paper delivery greatness. Nope, I had to interview for this job. And I tell you, I was magnificent, so much so that, as you know, I got the position. Upon completion of the interview the gentleman that was to give me my first opportunity at financial freedom stood up from my dining room table, walked to the front door and with a smile and a handshake, was off into the darkness.</p>
                            </div>
                        </div>
                        <div className="right">
                            <h1>О нас</h1>
                            <div className="text">
                                <p>Best software platform for running an internet business. We build the most powerful and flexible tools for internet commerce.</p></div>
                            <div className="socials">
                                <ul>
                                    <li><i className='icon-instagram' /></li>
                                    <li><i className='icon-paper-plane'/></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentWillUnmount(){}
}