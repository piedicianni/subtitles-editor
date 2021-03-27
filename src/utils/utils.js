const removeLinesBreak = str => str.replace(/\s/g, '');
const clearWrongClosingJson = str => {
    str = removeLinesBreak(str);
    let index;
    let a = 1;
    while (!index) {
        const temp = (str.lastIndexOf('}') - a);
        if (str[temp] !== ' ') index = temp;
        a++;
    }
    if (str[index] === ',') str = str.substr(0, index) + str.substring(index + 1);
    return str;
};
const secondsToHms = (seconds) => {
    seconds = Number(seconds);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 3600 % 60);
    
    const fm = (value) => `${value < 10 ? '0' : ''}${value}`;
    return `${h > 0 ? fm(h) + ':' : ''}${fm(m)}:${fm(s)}`;
};
const areOnlyNumbersAndDots = value => (/^\d*\.?\d*$/).test(value);
const convertToSeconds = (n) => n/1000;
const nextId = items => Math.max.apply(Math, items.map(item => parseInt(item.subtitle_id))) + 1;
const numberIsIncludedInsideRange = (n, min, max) => n >= min && n <= max;
const everyArrayIndexsAreTrue = (arr) => arr.every(itemBool => itemBool);

// Subtitles utils
const isActiveSubtitle = (seconds, start, end) => numberIsIncludedInsideRange(seconds, parseFloat(start), parseFloat(end));
const rangeIsAvailable = (seconds, items) => {
    const item = items.find(item => isActiveSubtitle(seconds, item.start, item.end));
    return item === undefined;
};
const getSubtitle = (seconds = 0, cache, items) => {
    if(cache?.subtitle_id && isActiveSubtitle(seconds, cache.start, cache.end)){
        console.log('cache  ->');
        return cache;
    }
    const item = items.find(item => isActiveSubtitle(seconds, item.start, item.end));
    return item;
};

export {
    clearWrongClosingJson,
    secondsToHms,
    areOnlyNumbersAndDots,
    convertToSeconds,
    nextId,
    everyArrayIndexsAreTrue,
    rangeIsAvailable,
    getSubtitle
};