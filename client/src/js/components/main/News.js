import React, {Component} from 'react';
import moment from "moment";
// import {NavLink} from "react-router-dom";

export default class News extends Component {
    constructor(props){
        super(props);
        this.state = {
            imgSrc : 'news.jpg'
        }

    }
    render() {
        // const  { imgSrc } = this.state;
        const images = [];
        const news = this.props.news.slice(0,3).map((item, index)=>{
            // console.log(index);
            images.push(
                <div style={{ backgroundImage: `url(/src/news/${item.photo})`}} className={`news-img-prev ${index === 0 ? 'news-img-prev-active': ''}`} key={index*10}/>
            );

            return <div className="intro-article-news" key={index} onMouseEnter={()=>{
                // console.log(item.photo);
                const active = document.getElementsByClassName('news-img-prev-active')[0];
                const notActive = document.getElementsByClassName('news-img-prev');
                active.classList.toggle('news-img-prev-active');
                notActive[index].classList.toggle('news-img-prev-active');

                //
                //
                // this.setState({
                //     imgSrc: item.photo
                // })
                // imgSrc = ;
            }}>
                <div className="top">
                    <div className="tag">
                        {item.tag}
                    </div>
                    <div className="date">
                        {moment(item.created).format('DD.MM.YYYY')}
                    </div>
                </div>
                <div className="title">{item.title}</div>
            </div>
        });
        // console.log(this.props.news);
        // console.log(imgSrc);

        return (
            <div className="intro-news">
                <div className="width-layer">
                    <div className="img-preview">
                        {/*<div style={{ backgroundImage: `url(/src/news/${imgSrc})`}}/>*/}
                        {images}
                        <img src="./src/main/dots.png" className={'dots'} alt=""/>

                    </div>
                    <div className="intro-news-container">
                        <h2>Последние новости</h2>
                        {news}
                        <div className="btn-all">Все новости</div>
                    </div>
                </div>
            </div>
        )
    }
}