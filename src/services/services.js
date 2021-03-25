import { INFO_JSON, SUBTITLE_LIST } from '../constants/constants';

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

const infoVideo = () => {
    const [promise, controller] = fetchData(INFO_JSON, {responseType: 'text'});
    return [promise, controller];
};

const subtitleList = () => {
    const [promise, controller] = fetchData(SUBTITLE_LIST);
    return [promise, controller];
};

export {
    handlerError,
    infoVideo,
    subtitleList
};