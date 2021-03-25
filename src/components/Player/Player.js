import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

function Player({ source, width, height }) {
    return (
        <ReactPlayer
            controls
            width={width}
            height={height}
            url={source}>

        </ReactPlayer>
    )
}

Player.propTypes = {
    source: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
}

export default Player;
