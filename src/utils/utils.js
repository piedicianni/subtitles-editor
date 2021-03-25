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
}

export {
    clearWrongClosingJson
};