import React, {Component} from 'react';
import moment from 'moment';
export default class News extends Component {
    constructor(props){
        super(props);
        this.state = {

        };

        props.allFunctions('all-news');
    }
    render() {
        const { news } = this.props;
        console.log(news);
        const newsContainer = news.map((item, index)=>{
           return <div className="news-article" key={index} onClick={()=>{
              this.props.history.push(`/adminka/news/${item._id}`)
           }}>
              <div className="img-logo" style={{backgroundImage: `url(/src/news/${item.photo}`}}/>
               <h2>{item.title}</h2>
               <h3>{moment(item.created).format('DD.MM.YYYY')}</h3>
               <p>{item.shortDesc}</p>
           </div>
        });


        if(!this.props.adminLogin){
            return <h1>Check user</h1>
        }
        const { history } = this.props;
        return (
            <div className="admin-news">
                <div className="content">
                    <div className="btn-add" onClick={()=>{
                        history.push(`/adminka/news/new`)
                    }}> Add News </div>
                    <div className="container">
                        {newsContainer}
                    </div>
                </div>
            </div>
        )
    }
}