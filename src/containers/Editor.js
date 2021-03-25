import { useEffect, useState } from 'react';
import { infoVideo, subtitleList } from '../services/services';
import { clearWrongClosingJson } from '../utils/utils';
import SubtitleList from './SubtitleList';
import VideoArea from './VideoArea';

function Editor() {
    const [videoInfo, setVideoInfo] = useState({});
    const [items, setItems] = useState([]);

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
            <SubtitleList items={items}/>
            <VideoArea {...videoInfo} />
        </>
    )
}

export default Editor;