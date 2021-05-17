import { useEffect, useState, createContext } from 'react';
import { infoVideo, subtitleList, storedSubtitles } from '../services/services';
import { clearWrongClosingJson } from '../utils/utils';
import SubtitleList from './SubtitleList';
import VideoArea from './VideoArea';
import { isRangeAvailable as checkRangeIsAvailable, mergeItemsAndStoredItems } from '../utils/utils';

export const EditorContext = createContext();

function Editor() {
    const [videoInfo, setVideoInfo] = useState({});
    const [items, setItems] = useState([]);
    const [secondsSeek, setSecondsSeek] = useState(0);
    const [secondsIn, setSecondsIn] = useState(0);
    const [secondsOut, setSecondsOut] = useState(0);
    const [isEditingItem, setIsEditingItem] = useState(false);
    const [isRangeAvailable, setIsRangeAvailable] = useState(false);

    useEffect(() => {
        if (!isEditingItem) return;
        setIsRangeAvailable(checkRangeIsAvailable(secondsIn, secondsOut, items));
    }, [secondsIn, secondsOut, items, isEditingItem]);

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
                const mergedItems = mergeItemsAndStoredItems(res, storedSubtitles())
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
                secondsSeek,
                setSecondsSeek,
                secondsIn,
                setSecondsIn,
                secondsOut,
                setSecondsOut,
                isEditingItem,
                setIsEditingItem,
                isRangeAvailable
            }}>
                <SubtitleList items={items} setItems={setItems} />
                <VideoArea items={items} {...videoInfo} />
            </EditorContext.Provider>
        </>
    )
}

export default Editor;
