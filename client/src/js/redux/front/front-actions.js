import axios from "axios";
// eslint-disable-next-line
import { front, QUERY_URL } from "../actionsAndUrl";


// function getCookie(name) {
//     let matches = document.cookie.match(new RegExp(
//         "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//     ));
//     return matches ? decodeURIComponent(matches[1]) : undefined;
// }
// function setCookie(name, value, options) {
//     options = options || {};
//
//     let expires = options.expires;
//
//     if (typeof expires === "number" && expires) {
//         let d = new Date();
//         d.setTime(d.getTime() + expires * 1000);
//         expires = options.expires = d;
//     }
//     if (expires && expires.toUTCString) {
//         options.expires = expires.toUTCString();
//     }
//
//     value = encodeURIComponent(value);
//
//     let updatedCookie = name + "=" + value;
//
//     for (let propName in options) {
//         updatedCookie += "; " + propName;
//         let propValue = options[propName];
//         if (propValue !== true) {
//             updatedCookie += "=" + propValue;
//         }
//     }
//
//     document.cookie = updatedCookie;
// }



export function allFunctions(type, data, options) {
    return dispatch =>{
        dispatch({type:front.REQUEST,});
        switch (type) {
            case "Add news":
                // console.log(data);
                axios.post(`${QUERY_URL}/news`, {data: data})
                    .then((res) => {
                        console.log(res);
                        dispatch({type: front.REQ_OFF});
                        if(options){
                            options();
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;

            case 'test':
                axios.get(`${QUERY_URL}/test`)
                    .then((res) => {
                        console.log(res);
                        options(res.data);
                        dispatch({type: front.REQ_OFF});

                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;



            case 'admin-enter':
                axios.post(`${QUERY_URL}/admin-enter`, {login: data.log, pass: data.pass})
                    .then((res) => {
                        console.log(res.data);
                        // options(res.data);
                        if(res.data === null || res.data === "password"){
                            alert('Не верный логин или пароль');
                        }else{
                            dispatch({type: front.LOGIN, login: true});
                            options(true);
                        }
                        dispatch({type: front.REQ_OFF});

                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;
            case 'check-auth':
                axios.post(`${QUERY_URL}/check-auth`, {})
                    .then((res) => {
                        console.log(res);
                        // options(res.data);
                        if(res.data === false){
                            options(false);
                            dispatch({type: front.LOGIN, login: false});
                        }else if(res.data.salt){
                            options(true);
                            dispatch({type: front.LOGIN, login: true});
                            // return true
                        }
                        dispatch({type: front.REQ_OFF});

                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;
            case 'exit-auth':
                axios.post(`${QUERY_URL}/exit-auth`, {})
                    .then((res) => {
                        // console.log(res);
                        options(true);
                        dispatch({type: front.LOGIN, login: false});
                        // options(res.data);
                        // if(res.data === false){
                        //     options(false);
                        //     dispatch({type: front.LOGIN, login: false});
                        // }else if(res.data.salt){
                        //     options(true);
                        //     dispatch({type: front.LOGIN, login: true});
                        //     // return true
                        // }
                        dispatch({type: front.REQ_OFF});

                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;

            case 'upload-file':

                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
                axios.post(`${QUERY_URL}/upload-file-news`, data.file, config)
                    .then((res) => {

                        console.log(res);
                        dispatch({type: front.REQ_OFF});

                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;

                case 'add-news':

                    axios.post(`${QUERY_URL}/add-news`, {data: data.news})
                        .then((res) => {
                            // console.log(res);
                            // options(res);
                            dispatch({type: front.REQ_OFF});

                        })
                        .catch((error) => {
                            console.log(error);
                        });
                break;

                case 'all-news':
                    axios.get(`${QUERY_URL}/all-news`)
                        .then((res) => {
                            console.log(res);
                            // options(res);
                            dispatch({type: 'Get News', news: res.data.sort((date1, date2) => {
                                    // This is a comparison function that will result in dates being sorted in
                                    // DESCENDING order.
                                    if (date1.created > date2.created) return -1;
                                    if (date1.created < date2.created) return 1;
                                    return 0;
                                })});

                        })
                        .catch((error) => {
                            console.log(error);
                        });
                break;

            case 'Get News By Id':
                axios.get(`${QUERY_URL}/news/${data.id}`)
                    .then((res) => {
                        options(res.data);
                        dispatch({type: front.REQ_OFF});
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;
                //change-news
            case 'Update News By Id':
                console.log(data.news);
                axios.post(`${QUERY_URL}/news/${data.id}`, {data: data.news})
                    .then((res) => {
                        // console.log(res);
                        options(res.data);
                        dispatch({type: front.REQ_OFF});
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;

            case 'Delete News By Id':
                // console.log('DASDAS');
                axios.delete(`${QUERY_URL}/news/${data.id}`)
                    .then((res) => {
                        // console.log(res);
                        options(res.data);
                        dispatch({type: front.REQ_OFF});
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;





            case 'set-default-val':
                console.log('Will be set def val');
                axios.post(`${QUERY_URL}/set-default-val`)
                    .then((res)=>{
                        console.log(res);
                        dispatch({type: front.REQ_OFF});
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;

            default: dispatch({type: front.REQ_OFF});
        }
    }
}