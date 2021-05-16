import { useState, useContext, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import Subtitle from './Subtitle';
import { EditorContext } from './Editor';
import { Button } from 'react-bootstrap';
import { nextId, addOrUpdateItem, sortItems } from '../utils/utils';
import NewSubtitle from './NewSubtitle';
import { storeItem } from '../services/services';

const initialRangeNewItem = {
    start: 1,
    end: 2
};

function SubtitleList({ items = [], setItems }) {
    const [editingId, setEditingId] = useState(-1);
    const [creatingId, setCreatingId] = useState(-1);
    const {
        setSecondsSeek,
        secondsIn,
        setSecondsIn,
        secondsOut,
        setSecondsOut,
        setIsEditingItem,
        isRangeAvailable
    } = useContext(EditorContext);
    const itemsDivRef = useRef(null);

    useEffect(() => {
        setIsEditingItem(editingId > -1);
        editingId > -1 && setCreatingId(-1);
    }, [editingId, setIsEditingItem]);

    useEffect(() => {
        editingId === -1 && setIsEditingItem(creatingId > -1);
        creatingId > -1 && elementScrollBottom();
    }, [creatingId, editingId, setIsEditingItem]);

    const onSetEditing = useCallback((id = -1) => setEditingId(id), []);
    const undoEditing = () => onSetEditing();

    const onSetCreating = (id = -1) => setCreatingId(id);
    const undoCreating = () => onSetCreating();

    const elementScrollBottom = (element = itemsDivRef.current) => {
        if (element) element.scrollTop = element.scrollHeight;
    };
    const onClickNew = () => {
        undoEditing();
        onSetCreating(nextId(items));
    };

    const updateItem = ({ id, secondsIn, secondsOut, text }) => {
        const item = {
            subtitle_id: id,
            text: [text],
            start: secondsIn,
            end: secondsOut
        };
        const itemRes = sortItems(addOrUpdateItem(item, items));
        storeItem(item);
        setItems(itemRes);
        undoEditing();
        undoCreating();
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
                            setSecondsSeek={setSecondsSeek}
                            {...(editingId === parseInt(item.subtitle_id) && {
                                onUpdate: updateItem,
                                secondsIn,
                                setSecondsIn,
                                secondsOut,
                                setSecondsOut,
                                isRangeAvailable
                            })}
                        />
                    ))
                }
                {
                    creatingId > -1 &&
                    <NewSubtitle
                        id={creatingId}
                        text={''}
                        start={initialRangeNewItem.start}
                        end={initialRangeNewItem.end}
                        editing={true}
                        {...{
                            onUpdate: updateItem,
                            secondsIn,
                            setSecondsIn,
                            secondsOut,
                            setSecondsOut,
                            isRangeAvailable
                        }}
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
    items: PropTypes.array.isRequired,
    setItems: PropTypes.func.isRequired
}

export default SubtitleList;
