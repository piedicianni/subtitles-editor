import { useState, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Subtitle from './Subtitle';
import { EditorContext } from './Editor';
import { Button } from 'react-bootstrap';
import { nextId } from '../utils/utils';
import NewSubtitle from './NewSubtitle';

function SubtitleList({ items = [] }) {
    const [editingId, setEditingId] = useState(-1);
    const [newId, setNewId] = useState(-1);
    const { setIsEditingItem } = useContext(EditorContext);
    const itemsDivRef = useRef(null);

    useEffect(() => {
        setIsEditingItem(editingId > -1);
        if (editingId > -1) onSetNew(-1);
    }, [editingId, setIsEditingItem]);

    useEffect(() => {
        setIsEditingItem(newId > -1);
        newId > -1 && divScrollBottom();
    }, [newId, setIsEditingItem]);

    const onSetEditing = (id = -1) => setEditingId(id);
    const onSetNew = (id = -1) => setNewId(id);
    const divScrollBottom = (div = itemsDivRef.current) => {
        if (div) div.scrollTop = div.scrollHeight;
    };
    const onNew = () => {
        onSetEditing();
        onSetNew(nextId(items));
    };

    return (
        <div className='subtitle-list'>
            <div className='items' ref={itemsDivRef}>
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
                {
                    newId > -1 &&
                    <NewSubtitle
                        id={newId}
                        text={''}
                        start={0}
                        end={0}
                        editing={true}
                        onCancel={() => onSetNew()}
                    />
                }
            </div>
            <div className='container-buttons'>
                <Button
                    variant="outline-dark"
                    onClick={() => onNew()}>Crea sottotitolo</Button>
            </div>
        </div>
    )
}

SubtitleList.propTypes = {
    items: PropTypes.array
}

export default SubtitleList;
