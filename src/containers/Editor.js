import { useEffect, useState, createContext } from 'react';
import { infoVideo, subtitleList } from '../services/services';
import { clearWrongClosingJson } from '../utils/utils';
import SubtitleList from './SubtitleList';
import VideoArea from './VideoArea';
import { rangeIsAvailable } from '../utils/utils';

export const EditorContext = createContext();

function Editor() {
    const [videoInfo, setVideoInfo] = useState({});
    const [items, setItems] = useState([]);
    const [secIn, setSecIn] = useState(0);
    const [secOut, setSecOut] = useState(0);
    const [isEditingItem, setIsEditingItem] = useState(false);
    const [timeRangeAvailable, setTimeRangeAvailable] = useState([false, false]);

    useEffect(() => {
        if (!isEditingItem) return;
        setTimeRangeAvailable(prevState => [rangeIsAvailable(secIn, items), prevState[1]]);
    }, [secIn, items, isEditingItem]);

    useEffect(() => {
        if (!isEditingItem) return;
        setTimeRangeAvailable(prevState => [prevState[0], rangeIsAvailable(secOut, items)]);
    }, [secOut, items, isEditingItem]);

    useEffect(() => {
        const [infoPromise, infoController] = infoVideo();
        infoPromise()
            .then(res => {
                const info = JSON.parse(clearWrongClosingJson(res));
                setVideoInfo(info);
            })
            .catch(error => console.log(error));

        const [listPromise, listController] = subtitleList();
        listPromise()
            .then(res => setItems(res))
            .catch(error => console.log(error));

        return () => {
            infoController.abort();
            listController.abort();
        };
    }, []);

    return (
        <>
            <EditorContext.Provider value={{
                secIn,
                setSecIn,
                secOut,
                setSecOut,
                isEditingItem,
                setIsEditingItem,
                timeRangeAvailable
            }}>
                <SubtitleList items={items} />
                <VideoArea items={items} {...videoInfo} />
            </EditorContext.Provider>
        </>
    )
}

export default Editor;
