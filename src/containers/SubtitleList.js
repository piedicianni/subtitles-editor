import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Subtitle from './Subtitle';
import { EditorContext } from './Editor';

function SubtitleList({ items = [] }) {
    const [editingId, setEditingId] = useState(-1);

    const { setIsEditingItem } = useContext(EditorContext);

    useEffect(() => {
        setIsEditingItem(editingId > -1);
    }, [editingId, setIsEditingItem]);

    const onSetEditing = (id = -1) => setEditingId(id);

    return (
        <div className='subtitle-list'>
            {
                items.map((item, index) => (
                    <Subtitle
                        key={index}
                        id={parseInt(item.subtitle_id)}
                        text={item.text.join('')}
                        start={parseFloat(item.start)}
                        end={parseFloat(item.end)}
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
