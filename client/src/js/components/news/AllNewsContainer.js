import React, {Component} from 'react';
import moment from "moment";

export default class AllNewsContainer extends Component {
    render() {
        const { filter } = this.props;

        return (
            <div className="container">
                {
                    !filter ?
                        this.getAllNews()
                        :
                        this.getAllFilterNews()
                }
            </div>
        )
    }


    getAllNews(){
        const { news, getTag, history } = this.props;



        return news.map((item, index)=>{
            return <div className="article-news" key={index} onClick={()=>{ history.push(`/news/${item._id}`)}}>
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


    getAllFilterNews(){
        // const { history } = this.props;
        const { filteredNews, getTag, history } = this.props;


        if(filteredNews.length > 0) {
            return filteredNews.map((item, index) => {
                return <div className="article-news" key={index} onClick={()=>{ history.push(`/news/${item._id}`)}}>
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
        }else {
            return <h1>По данным фильтрам ничего нету =(<br/>Попробуйте поискать что то другое!</h1>
        }
    }


}