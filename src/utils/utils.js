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

    const beautify = (value) => `${value < 10 ? '0' : ''}${value}`;
    return `${h > 0 ? beautify(h) + ':' : ''}${beautify(m)}:${beautify(s)}`;
};
const areOnlyNumbersAndDots = value => (/^\d*\.?\d*$/).test(value);
const convertToSeconds = (n) => n / 1000;
const nextId = items => Math.max.apply(Math, items.map(item => parseInt(item.subtitle_id))) + 1;
const numberIsIncludedInsideRange = (n, min, max) => n >= min && n <= max;
const twoNumbersAreIncludedInsideRange = (n, n1, min, max) => ((n >= min && n1 <= max) || (n < min && n1 >= min) || (n >= min && n <= max));
const everyArrayIndexesAreTrue = (arr) => arr.every(itemBool => itemBool);

// Subtitles utils
const isActiveSubtitle = (seconds, start, end) => numberIsIncludedInsideRange(seconds, parseFloat(start), parseFloat(end));
const isRangeAvailable = (start, end, items) => {
    const item = items.find(item => twoNumbersAreIncludedInsideRange(start, end, item.start, item.end));
    return item === undefined;
};
const getSubtitle = (seconds = 0, cache, items) => {
    if (cache?.subtitle_id && isActiveSubtitle(seconds, cache.start, cache.end)) {
        console.log('cache  ->');
        return cache;
    }
    const item = items.find(item => isActiveSubtitle(seconds, item.start, item.end));
    return item;
};
const addOrUpdateItem = (differentItem, items) => {
    const copy = [];
    items.forEach(item => copy.push({ ...item }));
    const existItemIndex = copy.findIndex(item => parseInt(item.subtitle_id) === differentItem.subtitle_id);
    // modify or add item
    if (existItemIndex > -1) copy.splice(existItemIndex, 1, differentItem);
    else copy.push(differentItem);
    return copy;
};
const sortItems = (items) => items.sort((a, b) => parseFloat(a.start) - parseFloat(b.start));
const mergeItemsAndStoredItems = (items, storedItems) => sortItems(storedItems.reduce((acc, cur) => addOrUpdateItem(cur, acc), items));

export {
    clearWrongClosingJson,
    secondsToHms,
    areOnlyNumbersAndDots,
    convertToSeconds,
    nextId,
    everyArrayIndexesAreTrue,
    isRangeAvailable,
    getSubtitle,
    addOrUpdateItem,
    sortItems,
    mergeItemsAndStoredItems
};