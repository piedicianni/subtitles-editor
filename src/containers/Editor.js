import { useEffect, useState, createContext } from 'react';
import { infoVideo, subtitleList } from '../services/services';
import { clearWrongClosingJson } from '../utils/utils';
import SubtitleList from './SubtitleList';
import VideoArea from './VideoArea';

export const EditorContext = createContext();

function Editor() {
    const [videoInfo, setVideoInfo] = useState({});
    const [items, setItems] = useState([]);
    const [secIn, setSecIn] = useState(0);
    const [secOut, setSecOut] = useState(0);
    const [isEditingItem, setIsEditingItem] = useState(false);

    useEffect(() => {
        // console.log(secIn);
    }, [secIn]);

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
                setIsEditingItem
            }}>
                <SubtitleList items={items} />
                <VideoArea {...videoInfo} />
            </EditorContext.Provider>
        </>
    )
}

export default Editor;
