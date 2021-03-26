const removeLinesBreak = str => str.replace(/\s/g, '');
const clearWrongClosingJson = str => {
    str = removeLinesBreak(str);
    let index;
    let a = 1;
    while(!index){
        const temp = (str.lastIndexOf('}') - a);
        if(str[temp] !== ' ') index = temp;
        a ++;
    }
    if (str[index] === ',') str = str.substr(0, index) + str.substring(index + 1);
    return str;
};
const secondsToHms = (seconds, hour = false) => {
    seconds = Number(seconds);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 3600 % 60);
    const hs = hour ? `${h < 10 ? '0' : ''}${h}:` : '';
    return `${hs}${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
};
const areOnlyNumbersAndDots = value => (/^\d*\.?\d*$/).test(value);

export {
    clearWrongClosingJson,
    secondsToHms,
    areOnlyNumbersAndDots
};