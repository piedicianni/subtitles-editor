import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import WithSubtitle from '../hoc/WithSubtitle';
import SubtitleForm from '../components/SubtitleForm/SubtitleForm';
import SubtitleRow from '../components/SubtitleRow/SubtitleRow';

function Subtitle({
    id,
    defInValue,
    inValue,
    setInValue,
    defOutValue,
    outValue,
    setOutValue,
    defText,
    text,
    setText,
    onSubmit,
    editing,
    onSetEditing
}) {

    const reset = useCallback(() => {
        setInValue(defInValue);
        setOutValue(defOutValue);
        setText(defText);
    }, [defInValue, defOutValue, defText, setInValue, setOutValue, setText]);

    useEffect(() => {
        // if(!editing) return;
        reset();
    }, [editing, reset]);

    const onClickEdit = () => onSetEditing(id);
    const onClickCancel = () => onSetEditing();

    return (
        <>
            {
                !editing
                    ? <SubtitleRow
                        {...{ id, text, inValue, outValue }}
                        onClickEdit={() => onClickEdit()} />
                    : <SubtitleForm
                        {...{ id, text, setText, inValue, setInValue, outValue, setOutValue, onSubmit }}
                        onClickCancel={() => onClickCancel()}
                    />
            }
        </>
    )
}

Subtitle.propTypes = {
    id: PropTypes.number,
    defInValue: PropTypes.number,
    inValue: PropTypes.number,
    setInValue: PropTypes.func,
    defOutValue: PropTypes.number,
    outValue: PropTypes.number,
    setOutValue: PropTypes.func,
    defText: PropTypes.string,
    text: PropTypes.string,
    setText: PropTypes.func,
    onSubmit: PropTypes.func,
    editing: PropTypes.bool,
    onSetEditing: PropTypes.func
};

export default WithSubtitle(Subtitle);
