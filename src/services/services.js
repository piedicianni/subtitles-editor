import { INFO_JSON, SUBTITLE_LIST, LOCAL_STORAGE_KEY_ITEMS } from '../constants/constants';

const handlerError = (error) => Promise.reject(error);

const fetchData = (url, params = { responseType: 'json' }) => {
    const controller = new AbortController();
    const { signal } = controller;
    const { responseType, ...restParams } = params;
    const start = async () => {
        try {
            const resp = await fetch(url, { ...restParams, signal });
            if (!resp.ok) return handlerError({ error: resp.statusText });
            const json = await resp[responseType]();
            return json;
        } catch (error) {
            return handlerError({ error: error });
        }
    };
    return [start, controller];
};

// method local storage
const getItem = (key) => {
    if (typeof (Storage) !== 'undefined') {
        return !localStorage.getItem(key) ? '{}' : localStorage.getItem(key);
    } else {
        return { error: true, description: 'Storage not supported' };
    }
};

const setItem = (key, value) => {
    if (typeof (Storage) !== 'undefined') {
        localStorage.setItem(key, value);
        return value;
    } else {
        return { error: true, description: 'Storage not supported' };
    }
};

const infoVideo = () => {
    const [promise, controller] = fetchData(INFO_JSON, { responseType: 'text' });
    return [promise, controller];
};

const subtitleList = () => {
    const [promise, controller] = fetchData(SUBTITLE_LIST);
    return [promise, controller];
};

const storeItem = (item) => {
    const storage = getItem(LOCAL_STORAGE_KEY_ITEMS);
    if (storage.error) return;
    const prevStored = JSON.parse(storage)?.items ?? [];
    const existItem = prevStored.findIndex(sub => sub.subtitle_id === item.subtitle_id);
    if (existItem > -1) prevStored.splice(existItem, 1);
    const resp = setItem(LOCAL_STORAGE_KEY_ITEMS, JSON.stringify(
        {
            items: [...prevStored, { ...item }]
        })
    );
    return resp;
};

const storedSubtitles = () => {
    const storage = getItem(LOCAL_STORAGE_KEY_ITEMS);
    if (!storage.error) return JSON.parse(storage)?.items ?? [];
    return [];
};

export {
    handlerError,
    infoVideo,
    subtitleList,
    storeItem,
    storedSubtitles
};