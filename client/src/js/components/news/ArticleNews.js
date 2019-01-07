import React, {Component} from 'react';
import DraftJsReadOnly from '../layers/DraftJsReadOnly.js';
import moment from "moment";
// let tri = [];
// let rh = [];
// let poli = [];
export default class ArticleNews extends Component {
    constructor(props){
        super(props);
        const taht = this;
        this.state = {
            load: true,
            news: {},
            triangles: this.generateTriang(),
            rhombs:  this.generateRhomb(),
            polys: this.generatePoly()

        };
        // console.log(props);
        this.figure = [];
        const that = this;
        props.allFunctions('Get News By Id', {id: props.match.params.id}, (res)=>{
            // console.log('RES IS :');
            // console.log(res);
            that.setState({
                load: false,
                news: res[0]
            })
        })
    }
    mousePosition(e){
        const { triangles, rhombs, polys } = this.state;
        const  posContainer = document.getElementById('posContainer');

        let _x = posContainer.offsetLeft + Math.floor(posContainer.offsetWidth / 2);
        let _y = posContainer.offsetTop + Math.floor(posContainer.offsetHeight / 2);
         e = e || window.event;
        let xx = e.clientX - _x;
        let yy = (e.clientY - _y) * -1;
        // console.log(xx, yy);

        const x = ()=>{
            if(xx < 101){
                return xx/10
            }else{
                return (xx/100) + 10
            }
        };
        const y = ()=>{
            if(yy < 101){
                return yy/10
            }else{
                return (yy/100) + 10
            }
        };

        for(let i = 0; i < this.figure.length; i++){



            // console.log(i);
            // console.log(i % 4);
            // console.log(this.figure[i]);

            switch ((i+1) % 4) {
                case 0:
                    this.figure[i].style.marginLeft = `${x()}px`;
                    this.figure[i].style.marginTop = `${y()}px`;
                    // console.log('case 0');
                    break;
                case 1:
                    this.figure[i].style.marginLeft = `${-(x())}px`;
                    this.figure[i].style.marginTop = `${-(y())}px`;
                    // console.log('case 1');

                    break;
                case 2:
                    this.figure[i].style.marginLeft = `${-(x())}px`;
                    this.figure[i].style.marginTop = `${y()}px`;
                    // console.log('case 2');
                    break;
                case 3:
                    this.figure[i].style.marginLeft = `${x()}px`;
                    this.figure[i].style.marginTop = `${-(y())}px`;
                    // console.log('case 3');
                    break;
                default:
                    this.figure[i].style.marginLeft = `${x()}px`;
                    this.figure[i].style.marginTop = `${y()}px`;
                    // console.log('case default');
            }
        }

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

    render() {
        const { load, news } = this.state
        return (
            <div className="a-news">
                <div className="width-layer">

                    {
                        load ?
                            this.getDefaultVal()
                            :
                            (
                                news !== 'notFound' ?
                                    this.getVal()
                                    :
                                    this.notFound()
                            )
                    }
                </div>
            </div>
        )
    }
    getDefaultVal(){
        return(
            <div className="content-box">
                <div className="photo-layer-a" style={{backgroundImage: `url(/src/main/mainLayer.svg)`}}/>
                <div className="head">
                    <div className="tag">Loading...</div>
                    <h1>Loading...</h1>
                    <div className="date">{moment(new Date()).format('DD.MM.YYYY')}</div>
                </div>
                <div className="content">
                    <h2>Loading...</h2>
                </div>
            </div>
        )
    }
    getVal(){
        const { news, triangles, rhombs, polys} = this.state;
        // console.log(`x: ${x}`);
        // console.log(`y: ${y}`);
        return(
            <div className="content-box">
                <div className="photo-layer-a" style={{backgroundImage: `url(/src/news/${news.photo})`}} id='posContainer' onMouseMove={(e)=>{
                    this.mousePosition(e);
                }}>
                    {triangles}
                    {rhombs}
                    {polys}
                    {/*{this.generateTriang()}*/}
                    {/*{this.generateRhomb()}*/}
                    {/*{this.generatePoly()}*/}
                </div>
                <div className="head" onMouseMove={(e)=>{
                    this.mousePosition(e);
                }}>
                    <div className="tag">{this.getTag(news.tag)}</div>
                    <h1>{news.title}</h1>
                    <div className="date">{moment(news.created).format('DD.MM.YYYY')}</div>
                </div>
                <div className="content">
                    <DraftJsReadOnly content={news.content}/>
                </div>
            </div>
        )
    }
    notFound(){
        return <div className="notFound">
            <h1>404 Not Found</h1>
            <div className="btn-back" onClick={()=>{
                this.props.history.push('/news');
            }}>Назад</div>
        </div>
    }









    //Random mytki


    generateTriang(){
        const howMuch = this.randomIntFromInterval(10,15);
        // console.log(howMuch);

        const arrOf = [];
        for(let i = 0; i < howMuch; i++) {
            const x = this.randomIntFromInterval(0,95);
            const y = this.randomIntFromInterval(0,95);
            const deg = this.randomIntFromInterval(50,300);
            const opacity = this.randomIntFromInterval(2,20);
            arrOf.push(
                <svg
                    ref={(figure) => { this.figure.push(figure); }}
                    className={'figure figure-triangle'}
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    x="0px" y="0px"
                    // width="512px" height="512px"
                    viewBox="0 0 124.512 124.512"
                    style={{
                        enableBackground: 'new 0 0 124.512 124.512',
                        top: `${y}%`,
                        left: `${x}%`,
                        transform: `rotate(${deg}deg)`
                    }}
                    xmlSpace="preserve"
                    key={i}
                >
                    <g>
                        <path
                            d="M113.956,57.006l-97.4-56.2c-4-2.3-9,0.6-9,5.2v112.5c0,4.6,5,7.5,9,5.2l97.4-56.2   C117.956,65.105,117.956,59.306,113.956,57.006z"
                            fill={`rgba(255, 255, 255,.0${opacity})`}/>
                    </g>
                </svg>
            )
        }

        return( arrOf );
    }


    generateRhomb(){
        const howMuch = this.randomIntFromInterval(15,20);
        // console.log(howMuch);

        const arrOf = [];
        for(let i = 0; i < howMuch; i++) {
            const x = this.randomIntFromInterval(0,90);
            const y = this.randomIntFromInterval(0,95);
            const deg = this.randomIntFromInterval(50,300);
            const opacity = this.randomIntFromInterval(2,20);
            arrOf.push(
                <svg
                    ref={(figure) => { this.figure.push(figure); }}
                    className={'figure figure-rhomb'}
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px" y="0px"
                    width="16" height="16"
                    viewBox="0 0 40 40"
                    style={{
                        enableBackground:'new 0 0 40 40',
                        fill: 'transparent',
                        top: `${y}%`,
                        left: `${x}%`,
                        transform: `rotate(${deg}deg)`

                    }}
                    key={i}

                >
                    <g>
                        <rect x="6.358" y="6.358" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -8.2843 20)" style={{
                            // fill:'transparent'
                            fill:'transparent'
                        }} width="27.284" height="27.284"/>
                        <g>
                            <path style={{
                                fill:`rgba(255, 255, 255,.0${opacity})`
                            }} d="M20,1.414L38.586,20L20,38.586L1.414,20L20,1.414 M20,0L0,20l20,20l20-20L20,0L20,0z"/>
                        </g>
                    </g>
                </svg>
            )
        }

        return( arrOf );
    }


    generatePoly(){
        const howMuch = this.randomIntFromInterval(20,25);
        // console.log(howMuch);

        const arrOf = [];
        for(let i = 0; i < howMuch; i++) {
            const x = this.randomIntFromInterval(0,90);
            const y = this.randomIntFromInterval(0,95);
            const deg = this.randomIntFromInterval(50,300);
            const opacity = this.randomIntFromInterval(2,20);
            arrOf.push(
                <svg
                    ref={(figure) => { this.figure.push(figure); }}
                    version="1.1"
                    className={'figure figure-poly'}
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px" y="0px"
                    width="35.616px" height="35.616px"
                    viewBox="0 0 35.616 35.616"
                    style={{
                        enableBackground:'new 0 0 35.616 35.616',
                        top: `${y}%`,
                        left: `${x}%`,
                        fill: `rgba(255, 255, 255,.0${opacity})`,
                        transform: `rotate(${deg}deg)`

                    }}
                    key={i}
                    xmlSpace="preserve"
                >
                    <g>
                        <g>
                            <polygon points="7.526,6.141 7.526,11.054 11.78,8.598 		"/>
                            <polygon points="7.526,12.282 7.526,17.193 11.78,14.738 		"/>
                            <polygon points="7.526,24.562 7.526,29.475 11.78,27.02 		"/>
                            <polygon points="7.881,30.09 12.135,32.546 12.135,27.635 		"/>
                            <polygon points="7.881,17.809 12.135,20.266 12.135,15.352 		"/>
                            <polygon points="7.881,11.668 12.135,14.124 12.135,9.211 		"/>
                            <polygon points="7.881,5.527 12.135,7.983 12.135,3.071 		"/>
                            <polygon points="12.844,3.071 12.844,7.983 17.099,5.527 		"/>
                            <polygon points="12.844,9.211 12.844,14.124 17.099,11.668 		"/>
                            <polygon points="12.844,15.352 12.844,20.266 17.099,17.809 		"/>
                            <polygon points="12.844,21.493 12.844,26.405 17.099,23.949 		"/>
                            <polygon points="12.844,27.635 12.844,32.546 17.099,30.09 		"/>
                            <polygon points="13.199,33.16 17.453,35.616 17.453,30.704 		"/>
                            <polygon points="13.199,27.02 17.453,29.475 17.453,24.562 		"/>
                            <polygon points="13.199,20.879 17.453,23.335 17.453,18.422 		"/>
                            <polygon points="13.199,14.738 17.453,17.193 17.453,12.282 		"/>
                            <polygon points="13.199,2.456 17.453,4.913 17.453,0 		"/>
                            <polygon points="2.208,9.211 2.208,14.124 6.462,11.668 		"/>
                            <polygon points="2.208,15.352 2.208,20.266 6.462,17.809 		"/>
                            <polygon points="2.208,21.493 2.208,26.405 6.462,23.949 		"/>
                            <polygon points="2.562,27.02 6.817,29.475 6.817,24.562 		"/>
                            <polygon points="2.562,20.879 6.817,23.335 6.817,18.422 		"/>
                            <polygon points="2.562,14.738 6.817,17.193 6.817,12.282 		"/>
                            <polygon points="2.562,8.598 6.817,11.054 6.817,6.141 		"/>
                            <polygon points="18.162,0 18.162,4.913 22.416,2.456 		"/>
                            <polygon points="18.162,12.282 18.162,17.193 22.416,14.738 		"/>
                            <polygon points="18.162,18.422 18.162,23.335 22.416,20.879 		"/>
                            <polygon points="18.162,24.562 18.162,29.475 22.416,27.02 		"/>
                            <polygon points="18.162,30.704 18.162,35.616 22.416,33.16 		"/>
                            <polygon points="18.517,30.09 22.771,32.546 22.771,27.635 		"/>
                            <polygon points="18.517,23.949 22.771,26.405 22.771,21.493 		"/>
                            <polygon points="18.517,17.809 22.771,20.266 22.771,15.352 		"/>
                            <polygon points="18.517,11.668 22.771,14.124 22.771,9.211 		"/>
                            <polygon points="18.517,5.527 22.771,7.983 22.771,3.071 		"/>
                            <polygon points="23.479,3.071 23.479,7.983 27.735,5.527 		"/>
                            <polygon points="23.479,9.211 23.479,14.124 27.735,11.668 		"/>
                            <polygon points="23.479,15.352 23.479,20.266 27.735,17.809 		"/>
                            <polygon points="23.479,27.635 23.479,32.546 27.735,30.09 		"/>
                            <polygon points="23.835,27.02 28.089,29.475 28.089,24.562 		"/>
                            <polygon points="23.835,14.738 28.089,17.193 28.089,12.282 		"/>
                            <polygon points="23.835,8.598 28.089,11.054 28.089,6.141 		"/>
                            <polygon points="28.798,6.141 28.798,11.054 33.052,8.598 		"/>
                            <polygon points="28.798,12.282 28.798,17.193 33.052,14.738 		"/>
                            <polygon points="28.798,18.422 28.798,23.335 33.052,20.879 		"/>
                            <polygon points="28.798,24.562 28.798,29.475 33.052,27.02 		"/>
                            <polygon points="29.153,23.949 33.408,26.405 33.408,21.493 		"/>
                            <polygon points="29.153,17.809 33.408,20.266 33.408,15.352 		"/>
                            <polygon points="29.153,11.668 33.408,14.124 33.408,9.211 		"/>
                        </g>
                    </g>
                </svg>
            )
        }
        return( arrOf );
    }



     randomIntFromInterval(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }
}