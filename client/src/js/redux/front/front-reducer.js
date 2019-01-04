import Immutable from "immutable";
import { front } from "../actionsAndUrl";

const InitialState = Immutable.fromJS({
    request: false,
    language: 'ru',
    adminLogin: false,
    news: [],
    events: []
});

const frontReducer = (state = InitialState, action) => {
    switch (action.type) {
        case  front.REQUEST:
            return state.set('request', true);

        case  front.REQ_OFF:
            return state.set('request', false);

        case front.LOGIN:
            return state.set('adminLogin', action.login).set('request', false);

        case 'Get News':
            return state.set('news', action.news).set('request', false);

        case 'Get Events':
            return state.set('events', action.events).set('request', false);



        default: return state;
    }
};

export default frontReducer;