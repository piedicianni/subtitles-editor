import { useContext, useRef } from 'react';
import Player from '../components/Player/Player';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { EditorContext } from './Editor';

function VideoArea(props) {
    const { isEditingItem, secIn, setSecIn, secOut, setSecOut } = useContext(EditorContext);
    const sliderRef = useRef(null);

    return (
        <div className='video-area'>
            <Player
                source='https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
                /* width={props.width}
                height={props.height} */ />
            {isEditingItem && (
                <div className='slider'>
                    <Nouislider
                        instanceRef={sliderRef}
                        range={{ min: 0, max: 598 }}
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
