import React from 'react'
import Player from '../components/Player/Player';

function VideoArea(props) {
    
    return (
        <Player
         source='https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' 
         width={props.width}
         height={props.height}/>
    )
}

export default VideoArea;
