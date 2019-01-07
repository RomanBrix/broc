import React, {Component} from 'react';
import AllNewsIntro from "./AllNewsIntro";
import AllNewsContainer from "./AllNewsContainer";

export default class AllNews extends Component {
    constructor(props){
        super(props);
        this.state = {
            filter: false,
            filteredNews: []
        };
        props.allFunctions('all-news'); // Download all news from database
    }

    componentWillReceiveProps(newProps){

        // console.log(newProps);
        if(newProps.reduxStore.news.length > 0){
            this.setState({
                filteredNews: newProps.reduxStore.news
            })
        }
    }

    filterFunc(){
        console.log('change');
        const { news } = this.props.reduxStore;

        const allCheckBox = document.getElementsByClassName('checkbox');
        const searchField = document.getElementById('search');
        let filteredNews = [];

        // console.log(allCheckBox);
        //
        // do some Filter from checkboxes
        //
        let forFilter = [];
        for(let i = 0; i < allCheckBox.length; i++){
            if(allCheckBox[i].checked){
                forFilter.push(allCheckBox[i].value);
            }
        }
        // console.log(forFilter);
        for (let val of forFilter) {
            // console.log(val);
            for (let i = 0; i < news.length; i++) {
                if (news[i].tag === val){
                    filteredNews.push(news[i]);
                }
            }
        }

        //
        // do search
        //
        console.log(searchField.value.length > 0);
        if(searchField.value.length > 0){
            filteredNews = filteredNews.length > 0 ? filteredNews : news;

            // console.log('filteredNews:  ' + filteredNews.length > 0 );
            // console.log( filteredNews) ;

            filteredNews =  filteredNews.filter((item, index)=>{
                if(item.title.toLowerCase().includes(searchField.value.toLowerCase())){
                    return item;
                }
            });
            console.log('search');
            console.log(filteredNews);
        }

        if(forFilter.length > 0 || searchField.value.length > 0) {
            this.setState({
                filter:true,
                filteredNews: filteredNews
            })

        }else{
            this.setState({
                filter:false
            })
        }
    }

    render() {
        const { news } = this.props.reduxStore;
        const { history } = this.props;
        const { filter, filteredNews } = this.state;
        // console.log('News for filter: ');
        // console.log(filteredNews);

        return (
            <div className="news">
                <div className="photo-layer" style={{backgroundImage: `url(./src/main/mainLayer.svg)`}}/>
                <div className="width-layer">
                    <AllNewsIntro news={ news } getTag={this.getTag.bind(this)} filter={ filter } history={ history } filteredNews={ filteredNews } filterFunc={ this.filterFunc.bind(this) }/>
                    <AllNewsContainer news={ news } getTag={this.getTag.bind(this)} filter={ filter } history={ history }  filteredNews={filteredNews}/>
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