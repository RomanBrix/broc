export function animateScroll(elem, style = 'scrollTop', unit = '', from = window.pageYOffset, to = 0, time = 400, prop = true) {
    if (!elem) {
        return;
    }
    const newTime = Math.abs(+from - +to);
    console.log(newTime);
    if(newTime < 500){
        time = newTime;
    }
    // console.log('new time is: ', time);
    let start = new Date().getTime(),
        timer = setInterval(function () {
            let step = Math.min(1, (new Date().getTime() - start) / time);
            if (prop) {
                elem[style] = (from + step * (to - from))+unit;
            } else {
                elem.style[style] = (from + step * (to - from))+unit;
            }
            if (step === 1) {
                clearInterval(timer);
            }
        }, 25);
    if (prop) {
        elem[style] = from+unit;
    } else {
        elem.style[style] = from+unit;
    }
}

export  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        // eslint-disable-next-line
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}