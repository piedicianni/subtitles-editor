import { useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import WithSubtitle from '../hoc/WithSubtitle';
import SubtitleForm from '../components/SubtitleForm/SubtitleForm';
import SubtitleRow from '../components/SubtitleRow/SubtitleRow';
import { EditorContext } from './Editor';

function Subtitle({
    id,
    defSecIn,
    defSecOut,
    defText,
    onSetSecIn,
    onSetSecOut,
    text,
    setText,
    onSubmit,
    editing,
    onSetEditing
}) {

    const { secIn, setSecIn, secOut, setSecOut } = useContext(EditorContext);

    const setDefaultValues = useCallback(() => {
        setSecIn(defSecIn);
        setSecOut(defSecOut);
        setText(defText);
    }, [defSecIn, defSecOut, defText, setSecIn, setSecOut, setText]);


    useEffect(() => {
        if (!editing) return;
        setDefaultValues();
    }, [editing, setDefaultValues]);

    const onClickEdit = () => onSetEditing(id);
    const onClickCancel = () => onSetEditing();

    return (
        <>
            {
                !editing
                    ? <SubtitleRow
                        id={id}
                        inValue={defSecIn}
                        outValue={defSecOut}
                        text={defText}
                        onClickEdit={() => onClickEdit()} />
                    : <SubtitleForm
                        {...{ id, text, setText, onSubmit }}
                        inValue={secIn}
                        setInValue={onSetSecIn}
                        outValue={secOut}
                        setOutValue={onSetSecOut}
                        onClickCancel={() => onClickCancel()}
                    />
            }
        </>
    )
}

Subtitle.propTypes = {
    id: PropTypes.number,
    defSecIn: PropTypes.number,
    defSecOut: PropTypes.number,
    defText: PropTypes.string,
    onSetSecIn: PropTypes.func,
    onSetSecOut: PropTypes.func,
    text: PropTypes.string,
    setText: PropTypes.func,
    onSubmit: PropTypes.func,
    editing: PropTypes.bool,
    onSetEditing: PropTypes.func
};

export default WithSubtitle(Subtitle);
