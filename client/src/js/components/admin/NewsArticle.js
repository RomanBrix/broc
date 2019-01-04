import React, {Component} from 'react';
import DraftJs from "../layers/DraftJs";
import SelfDayPicker from "../layers/DayPicker";

export default class NewsArticle extends Component {
    constructor(props){
        super(props);

            this.state = {
                news: {
                    title: 'New One',
                    photo: 'news.jpg',
                    shortDesc: 'Short Desc',
                    content: null,
                    tag: 'party',
                    date: new Date()
                },
                contForSave: null,
                newPubDate: new Date(),
                fileToUpload: null,
                fileName: null,
                imgPreview: null
            };
        if(props.match.params.id !== 'new') {
                //Запрос на данные по id
            const that  = this;
            props.allFunctions('Get News By Id',{id: props.match.params.id}, (res)=>{
                if(res.length > 0 ){
                    const willBeNews = res[0];
                    that.setState({
                        news: {
                            title: willBeNews.title,
                            photo: willBeNews.photo,
                            shortDesc: willBeNews.shortDesc,
                            content: willBeNews.content,
                            tag: willBeNews.tag,
                            date: willBeNews.created
                        }
                    })
                }
            })
            // if id > null - redirect to 404 not found ;
        }
    }


    dropdownChanged(e){
        const newState = this.state.news;
        newState.tag = e.target.value;
        this.setState({
            news: newState
        });
    }
    titleChange(e){
        const lastNews = this.state.news;
        lastNews.title = e.target.value;
        this.setState({
            news: lastNews
        })
    }
    changeShortDesc(e){
        const newState = this.state.news;
        newState.shortDesc = e.target.value;
        this.setState({
            news: newState
        });
    }
    setDayPub(day, { selected }) {
        const { news } = this.state;
        const newState = news;
        newState.date = selected ? undefined : new Date(day);
        this.setState({
            news: newState
        });

    }
    onChangeUpload(e){
        // const newState = this.state.news;
        if(e.target.files[0]) {
            // newState.photo = e.target.files[0].name;
            this.setState({
                fileToUpload: e.target.files[0],
                fileName: e.target.files[0].name,
                imgPreview: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    saveDraftJsContent(content){

        this.setState({
            contForSave: content
        })
    }


    render() {
        if(!this.props.adminLogin){
            return <h1>Check user</h1>
        }
        const { news, imgPreview } = this.state;

// eslint-disable-next-line
        let getTag = 'Развлечение';
        switch (news.tag) {
            case 'party':
                getTag = <div className="tag mint-tag">Развлечение</div>;
                break;
            case 'paertners':
                getTag = <div className="tag pink-tag" >Партнерство</div>;
                break;
            case 'local':
                getTag = <div className="tag green-tag">Локальные</div>;
                break;
            case 'trade':
                getTag = <div className="tag green-tag">Биржа</div>;
                break;
            default:
                getTag = '';
        }

        let imgSrc = '/src/news/' + news.photo;
        if(imgPreview !== null){
            imgSrc = imgPreview;
        }

        return (
            <div className="admin-news-article">
                <input type="text" value={news.title} onChange={this.titleChange.bind(this)}/>

                <select name="tag" value={news.tag} onChange={this.dropdownChanged.bind(this)}>
                    <option value="party">Развлечение</option>
                    <option value="paertners" >Партнерство</option>
                    <option value="local" >Локальные</option>
                    <option value="trade" >Биржа</option>

                </select>

                <h3>Краткое описание:</h3>
                <textarea name="shortDesc" id="shortDesc" ref={'shortDesc'} value={news.shortDesc} onChange={this.changeShortDesc.bind(this)}/>



                {/*////date*/}
                <h2>Дата публикации</h2>
                <SelfDayPicker
                    selectedDay={new Date(this.state.news.date)}
                    setDay={this.setDayPub.bind(this)}
                />



                {/*/////photo*/}
                <h2>Фото:</h2>
                <div className={'photo-load'} style={{backgroundImage: `url(${imgSrc})`}} onClick={()=>{
                    const fff = document.getElementById('file');
                    fff.click();
                }}/>

                <input type="file" name="myImage" onChange={this.onChangeUpload.bind(this)} id={'file'}/>




                {/*/////content*/}
                <DraftJs saveDraftJsContent={this.saveDraftJsContent.bind(this)} content={news.content}/>

                {
                    this.props.match.params.id === 'new' ?
                        <div className="btn-add" onClick={()=>{
                            const { news, fileName, fileToUpload, contForSave} = this.state;
                            const stateForSave = news;
                            stateForSave.content = contForSave;

                            if(fileToUpload !== null){
                                let formData = new FormData();
                                    formData.append('myImage', this.state.fileToUpload);

                                stateForSave.photo = fileName;
                                this.props.allFunctions('upload-file',{file: formData});
                            }
                            this.props.allFunctions('add-news',{news: stateForSave});

                        }}>Добавить</div>
                        :
                        <div className="btns">
                            <div className="btn-save" onClick={()=>{
                                this.saveContent();
                            }}>Сохранить</div>

                            <div className="btn-delete" onClick={()=>{this.deleteNews()}}>Удалить</div>
                        </div>
                }
            </div>
        )
    }

    saveContent(){
        const { news, fileName, fileToUpload, contForSave} = this.state;
        const stateForSave = news;
        stateForSave.content = contForSave;

        if(fileToUpload !== null){
            let formData = new FormData();
            formData.append('myImage', this.state.fileToUpload);

            stateForSave.photo = fileName;
            this.props.allFunctions('upload-file',{file: formData});
        }

        this.props.allFunctions('Update News By Id',{news: stateForSave, id: this.props.match.params.id }, (res)=>{
            console.log(res);
            if(res.ok == 1){
                alert('Saved');
            }
        });

    }
    deleteNews(){
        this.props.allFunctions('Delete News By Id',{id: this.props.match.params.id }, (res)=>{
            console.log(res);
            if(res.ok == 1){
                alert('Deleted');
                this.props.history.push('/adminka/news');
            }
        });
    }
}