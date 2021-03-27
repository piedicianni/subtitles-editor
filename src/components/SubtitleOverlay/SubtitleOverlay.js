import React from 'react';
import PropTypes from 'prop-types';

function SubtitleOverlay({ text }) {
    return (
        <div className='subtitle-overlay'>
            <p>{text}</p>
        </div>
    )
}

SubtitleOverlay.propTypes = {
    text: PropTypes.string.isRequired
};

export default SubtitleOverlay;
