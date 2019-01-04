import React, {Component} from 'react';
import moment from "moment";

export default class AllNewsIntro extends Component {

    getCheckBoxes(){
       const allTag = this.props.news.map((item)=>{
           return item.tag;
       });

        let sortedTag = [];

        for (let i = 0; i < allTag.length; i++){
            if(!sortedTag.includes(allTag[i])){
                sortedTag.push(allTag[i]);
            }

            if(i === allTag.length - 1){
                sortedTag.sort();
            }
        }

        return sortedTag.map((item, index)=>{
            return <span className="check" key={index}>
                <input type="checkbox" name={item} id={item} value={item}/>
                <label htmlFor={item}>
                    <svg width="18px" height="18px" viewBox="0 0 18 18">
    <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"/>
    <polyline points="1 9 7 14 15 4"/>
  </svg>
                    {this.props.getTag(item)}
                </label>
                </span>
        })
    }
    render() {

        return (
            <div className="intro" >

                <div className="left">
                    <h2>Фильтры и Поиск</h2>
                    <div className="box">
                        <div className="checkboxes">
                            {this.getCheckBoxes()}
                        </div>
                        <div className="search">
                            <label htmlFor="search" ref={'labelSearch'}>Поиск</label>
                            <input type="text" id={'search'} placeholder={'Bitcoin'}
                                   onFocus={({target})=>{
                                       this.onSelectInput(this.refs.labelSearch, target);
                                   }}
                                   onBlur={({target})=>{
                                       this.onSelectInput(this.refs.labelSearch, target);
                                   }}
                            />
                        </div>
                    </div>
                </div>

                <div className="right">
                    <img src={'/src/main/dots.png'} className={'dots'} alt=""/>
                    <h1>Последние новости</h1>
                    <div className="intro-news">
                        {this.sortNews()}
                    </div>
                </div>
            </div>
        )
    }




    sortNews(){
        return this.props.news.slice(0,3).map((item, index)=>{
            return <div className="intro-article-news" key={index}>
                <div className="top">
                    <div className="tag">
                        {this.props.getTag(item.tag)}
                    </div>
                    <div className="date">
                        {moment(item.created).format('DD.MM.YYYY')}
                    </div>
                </div>
                <div className="title">{item.title}</div>
            </div>
        });
    }



    onSelectInput(label, target){
        // label.style.top = '';
        // label.style.left = '0px'
        if(target.value.length === 0) {
            label.classList.toggle('label-active');
        }
    }
}