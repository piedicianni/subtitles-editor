import { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import WithSubtitle from '../hoc/WithSubtitle';
import SubtitleForm from '../components/SubtitleForm/SubtitleForm';
import SubtitleRow from '../components/SubtitleRow/SubtitleRow';
import { EditorContext } from './Editor';
import { secondsToHms, everyArrayIndexsAreTrue } from '../utils/utils';

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

    const { secIn, secOut, timeRangeAvailable } = useContext(EditorContext);

    const onClickEdit = () => onSetEditing(id);
    const onClickCancel = () => onSetEditing();
    /* const checkTimeRangeAvailable = () => {
        console.log(secIn, defSecIn)
        if (!everyArrayIndexsAreTrue(timeRangeAvailable)
            && secIn === defSecIn
            && secOut === defSecOut) return true;
        return everyArrayIndexsAreTrue(timeRangeAvailable);
    }; */
    return (
        <>
            {
                !editing
                    ? <SubtitleRow
                        id={id}
                        inValue={secondsToHms(defSecIn)}
                        outValue={secondsToHms(defSecOut)}
                        text={defText}
                        onClickEdit={() => onClickEdit()} />
                    : <SubtitleForm
                        {...{ id, text, setText, onSubmit }}
                        inValue={secIn}
                        setInValue={onSetSecIn}
                        outValue={secOut}
                        setOutValue={onSetSecOut}
                        timeRangeAvailable={everyArrayIndexsAreTrue(timeRangeAvailable)}
                        formatedIn={secondsToHms(secIn)}
                        formatedOut={secondsToHms(secOut)}
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

export default memo(WithSubtitle(Subtitle));
