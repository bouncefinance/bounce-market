function debounce (fn, ms) {
    let timer = null;
    return function () {
        const context = this;
        const args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(context, args);
            timer = null;
        }, ms)
    }
}

export default debounce;