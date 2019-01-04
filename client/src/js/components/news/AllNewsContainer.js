import React, {Component} from 'react';
import moment from "moment";

export default class AllNewsContainer extends Component {
    render() {
        // const { news } = this.props;

        return (
            <div className="container">
                {this.getAllNews()}
            </div>
        )
    }


    getAllNews(){
        const { news, getTag } = this.props;



        return news.map((item, index)=>{
            return <div className="article-news" key={index}>
                <div className="img" style={{backgroundImage: `url(/src/news/${item.photo})`}}/>

                <div className="content">
                    <div className="top">
                        <div className="tag">
                            {getTag(item.tag)}
                        </div>
                        <div className="date">
                            {moment(item.created).format('DD.MM.YYYY')}
                        </div>
                    </div>
                    <div className="title">{item.title}</div>
                    <p>{item.shortDesc}</p>
                </div>
            </div>
        });
    }


}