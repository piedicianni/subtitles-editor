import { useContext, useEffect, useRef, useState, useMemo } from 'react';
import ReactPlayer from 'react-player';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { EditorContext } from './Editor';
import { VIDEO_URL } from '../constants/constants';
import { getSubtitle } from '../utils/utils';
import SubtitleOverlay from '../components/SubtitleOverlay/SubtitleOverlay';

const onVideoPlaying = () => {
    let subtitle = {};
    return (current, subtitles) => {
        subtitle = getSubtitle(current, { ...subtitle }, subtitles);
        return subtitle;
    };
};

function VideoArea(props) {
    const [pause, setPause] = useState(true);
    const [secondsPlayed, setSecondsPlayed] = useState(0);
    const [subtitleOnScreen, setSubtitleOnScreen] = useState('');
    const { secondsSeek, isEditingItem, secondsIn, setSecondsIn, secondsOut, setSecondsOut } = useContext(EditorContext);
    const playerRef = useRef(null);

    const subtitleText = useMemo(() => {
        if (isEditingItem) return;
        return onVideoPlaying();
    }, [isEditingItem]);

    useEffect(() => {
        if (secondsSeek === 0 || isEditingItem) return;
        playerRef.current.seekTo(secondsSeek);
    }, [secondsSeek, isEditingItem]);

    useEffect(() => {
        if (secondsIn === 0) return;
        playerRef.current.seekTo(secondsIn);
    }, [secondsIn]);

    useEffect(() => {
        if (secondsOut === 0) return;
        playerRef.current.seekTo(secondsOut);
    }, [secondsOut]);

    useEffect(() => {
        if (!subtitleText) return;
        setSubtitleOnScreen(subtitleText(secondsPlayed, props.items)?.text.join('\n') ?? '');
    }, [secondsPlayed, subtitleText, props.items]);

    useEffect(() => {
        if (!isEditingItem) return;
        setPause(true);
    }, [isEditingItem]);

    const onSetSecPlayed = (value) => setSecondsPlayed(Math.ceil(value));

    return (
        <div className='video-area'>
            <div className='player'>
                <ReactPlayer
                    ref={playerRef}
                    controls={!isEditingItem}
                    url={VIDEO_URL}
                    playing={!pause}
                    onPlay={() => setPause(false)}
                    onPause={() => setPause(true)}
                    onProgress={(params) => onSetSecPlayed(params.playedSeconds)}
                    onSeek={(sec) => onSetSecPlayed(sec)}
                    /* width={props.width}
                    height={props.height} */ />
                {
                    (subtitleOnScreen !== '' && !isEditingItem) &&
                    <SubtitleOverlay text={subtitleOnScreen} />
                }
            </div>
            {isEditingItem && (
                <div className='slider'>
                    <Nouislider
                        range={{ min: 0, max: parseFloat(props.duration) }}
                        start={[secondsIn, secondsOut]}
                        onChange={(values, handle) => {
                            const setFn = handle === 0 ? setSecondsIn : setSecondsOut;
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
