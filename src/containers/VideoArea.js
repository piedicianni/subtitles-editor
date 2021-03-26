import { useContext, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { EditorContext } from './Editor';
import { VIDEO_URL } from '../constants/constants';

function VideoArea(props) {
    const { isEditingItem, secIn, setSecIn, secOut, setSecOut } = useContext(EditorContext);
    const playerRef = useRef(null);

    useEffect(() => {
        if(secIn === 0) return;
        playerRef.current.seekTo(secIn);
    }, [secIn]);

    useEffect(() => {
        if(secOut === 0) return;
        console.log(playerRef?.current)
        playerRef.current.seekTo(secOut);
    }, [secOut]);

    useEffect(() => {
        if(!isEditingItem) return;
        // playerRef.current.props.playing = false;
    }, [isEditingItem]);

    return (
        <div className='video-area'>
            <ReactPlayer
                ref={playerRef}
                controls
                url={VIDEO_URL}
                /* width={props.width}
                height={props.height} */ />
            {isEditingItem && (
                <div className='slider'>
                    <Nouislider
                        range={{ min: 0, max: parseFloat(props.duration) }}
                        start={[secIn, secOut]}
                        onChange={(values, handle) => {
                            const setFn = handle === 0 ? setSecIn : setSecOut;
                            setFn(parseFloat(values[handle]));
                        }}
                        connect
                        tooltips />
                </div>
            )}
        </div>
    )
}

export default VideoArea;
