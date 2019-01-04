import React, {Component} from 'react';

export default class About extends Component {
    constructor(props){
        super(props);
        this.state = {
            stories: [
                {
                    title: 'Good design is innovative',
                    p: 'Интеллект естественно понимает под собой интеллигибельный закон внешнего мира, открывая новые горизонты.'
                },
                {
                    title: 'Good design is innovative',
                    p: 'Дискретность амбивалентно транспонирует гравитационный парадокс. Структурализм абстрактен. Сомнение рефлектирует естественный закон исключённого третьего...'
                },
                {
                    title: 'Good design is innovative',
                    p: 'Интеллект естественно понимает под собой интеллигибельный закон внешнего мира, открывая новые горизонты. '
                },
                {
                    title: 'Good design is innovative',
                    p: 'Интеллект естественно понимает под собой интеллигибельный закон внешнего мира, открывая новые горизонты.'
                },
                {
                    title: 'Good design is innovative',
                    p: 'Дискретность амбивалентно транспонирует гравитационный парадокс. Структурализм абстрактен. Сомнение рефлектирует естественный закон исключённого третьего...'
                },
                {
                    title: 'Good design is innovative',
                    p: 'Интеллект естественно понимает под собой интеллигибельный закон внешнего мира, открывая новые горизонты. '
                }
            ]
        }
    }

    render() {
        const { stories } = this.state;

        const container = stories.map((item, index)=>{
            return <div className={'container-item'} key={index}>
                <div className="ok"><i className='icon-check-mark'/></div>
                <h3>{item.title}</h3>
                <p>{item.p}</p>
            </div>
        });
        return (
            <div className="intro-about">
                <div className="width-layer">
                    <h2>Лучшая цена на рынке! Нет никаких посредников между продавцами и покупателями.</h2>
                    <div className="container">
                        {container}
                    </div>
                </div>
            </div>
        )
    }
}