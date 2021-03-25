import {useState} from 'react';
import PropTypes from 'prop-types';
import Subtitle from './Subtitle';

function SubtitleList({ items = [] }) {
    const [editingId, setEditingId] = useState(0);

    const onSetEditing = (id = 0) => setEditingId(id);

    return (
        <div className='subtitle-list'>
            {
                items.map((item, index) => (
                    <Subtitle
                        key={index}
                        id={parseInt(item.subtitle_id)}
                        text={item.text.join('')}
                        inValue={parseFloat(item.start)}
                        outValue={parseFloat(item.end)}
                        editing={editingId === parseInt(item.subtitle_id)}
                        onSetEditing={onSetEditing}
                    />
                ))
            }
        </div>
    )
}

SubtitleList.propTypes = {
    items: PropTypes.array
}

export default SubtitleList;
