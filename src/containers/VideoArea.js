import { useContext } from 'react';
import Player from '../components/Player/Player';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { EditorContext } from './Editor';

function VideoArea(props) {
    const { editingItem } = useContext(EditorContext);

    return (
        <div className='video-area'>
            <Player
                source='https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
                /* width={props.width}
                height={props.height} */ />
            {editingItem && (
                <div className='slider'>
                    <Nouislider
                        range={{ min: 0, max: 598 }}
                        start={[20, 80]}
                        onUpdate={(values, handle) => {
                            // if(handle === 0) editorContext.setSecIn(parseFloat(values[handle]));
                            // editorContext.setSecOut(parseFloat(values[1]));
                        }}
                        connect
                        tooltips />
                </div>
            )}
        </div>
    )
}

export default VideoArea;
