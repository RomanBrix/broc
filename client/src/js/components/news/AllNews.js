import React, {Component} from 'react';
import AllNewsIntro from "./AllNewsIntro";
import AllNewsContainer from "./AllNewsContainer";

export default class AllNews extends Component {
    constructor(props){
        super(props);
        this.state = {};
        props.allFunctions('all-news'); // Download all news from database

        console.log(props);
    }
    render() {
        const { news } = this.props.reduxStore;
        return (
            <div className="news">
                <div className="photo-layer" style={{backgroundImage: `url(./src/main/mainLayer.svg)`}}/>
                <div className="width-layer">
                    <AllNewsIntro news={ news } getTag={this.getTag.bind(this)}/>
                    <AllNewsContainer news={ news } getTag={this.getTag.bind(this)}/>
                </div>
            </div>
        )
    }





    getTag(tag){
        switch (tag) {
            case 'party':
                return 'Развлечение';
            case 'paertners':
                return 'Партнерство';
            case 'local':
                return 'Локальные';
            case 'trade':
                return 'Биржа';
            default: return ''

        }
    }
}