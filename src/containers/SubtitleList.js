import { useState, useContext, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import Subtitle from './Subtitle';
import { EditorContext } from './Editor';
import { Button } from 'react-bootstrap';
import { nextId } from '../utils/utils';
import NewSubtitle from './NewSubtitle';

function SubtitleList({ items = [] }) {
    const [editingId, setEditingId] = useState(-1);
    const [creatingId, setCreatingId] = useState(-1);
    const { setIsEditingItem } = useContext(EditorContext);
    const itemsDivRef = useRef(null);

    useEffect(() => {
        setIsEditingItem(editingId > -1);
        editingId > -1 && setCreatingId(-1);
    }, [editingId, setIsEditingItem]);

    useEffect(() => {
        editingId === -1 && setIsEditingItem(creatingId > -1);
        creatingId > -1 && divScrollBottom();
    }, [creatingId, editingId, setIsEditingItem]);

    const onSetEditing = useCallback((id = -1) => setEditingId(id), []);
    const undoEditing = () => onSetEditing();
    
    const onSetCreating = (id = -1) => setCreatingId(id);
    const undoCreating = () => onSetCreating();

    const divScrollBottom = (div = itemsDivRef.current) => {
        if (div) div.scrollTop = div.scrollHeight;
    };
    const onClickNew = () => {
        undoEditing();
        onSetCreating(nextId(items));
    };

    return (
        <div className='subtitle-list'>
            <div className='items' ref={itemsDivRef}>
                {
                    items.map(item => (
                        <Subtitle
                            key={parseInt(item.subtitle_id)}
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
                    creatingId > -1 &&
                    <NewSubtitle
                        id={creatingId}
                        text={''}
                        start={0}
                        end={0}
                        editing={true}
                        onCancel={() => undoCreating()}
                    />
                }
            </div>
            <div className='container-buttons'>
                <Button
                    variant="outline-dark"
                    onClick={() => onClickNew()}>Crea sottotitolo</Button>
            </div>
        </div>
    )
}

SubtitleList.propTypes = {
    items: PropTypes.array
}

export default SubtitleList;
