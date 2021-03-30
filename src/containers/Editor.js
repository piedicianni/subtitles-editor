import { useEffect, useState, createContext } from 'react';
import { infoVideo, subtitleList, storedSubtitles } from '../services/services';
import { clearWrongClosingJson } from '../utils/utils';
import SubtitleList from './SubtitleList';
import VideoArea from './VideoArea';
import { rangeIsAvailable, mergeItemsAndStored } from '../utils/utils';

export const EditorContext = createContext();

function Editor() {
    const [videoInfo, setVideoInfo] = useState({});
    const [items, setItems] = useState([]);
    const [secSeek, setSecSeek] = useState(0);
    const [secIn, setSecIn] = useState(0);
    const [secOut, setSecOut] = useState(0);
    const [isEditingItem, setIsEditingItem] = useState(false);
    const [timeRangeAvailable, setTimeRangeAvailable] = useState(false);

    useEffect(() => {
        if (!isEditingItem) return;
        setTimeRangeAvailable(rangeIsAvailable(secIn, secOut, items));
    }, [secIn, secOut, items, isEditingItem]);

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
            .then(res => {
                const mergedItems = mergeItemsAndStored(res, storedSubtitles())
                setItems(mergedItems);
            })
            .catch(error => console.log(error));

        return () => {
            infoController.abort();
            listController.abort();
        };
    }, []);

    return (
        <>
            <EditorContext.Provider value={{
                secSeek,
                setSecSeek,
                secIn,
                setSecIn,
                secOut,
                setSecOut,
                isEditingItem,
                setIsEditingItem,
                timeRangeAvailable
            }}>
                <SubtitleList items={items} setItems={setItems} />
                <VideoArea items={items} {...videoInfo} />
            </EditorContext.Provider>
        </>
    )
}

export default Editor;
