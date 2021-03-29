import { memo } from 'react';
import PropTypes from 'prop-types';
import WithSubtitle from '../hoc/WithSubtitle';
import SubtitleForm from '../components/SubtitleForm/SubtitleForm';
import SubtitleRow from '../components/SubtitleRow/SubtitleRow';
import { secondsToHms } from '../utils/utils';

function Subtitle({
    id,
    defSecIn,
    defSecOut,
    defText,
    text,
    setText,
    editing,
    setSecSeek,
    secIn,
    onSetSecIn,
    secOut,
    onSetSecOut,
    onSubmit,
    timeRangeAvailable,
    onSetEditing
}) {

    const onClickPreview = () => setSecSeek(defSecIn);
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
                        onClickPreview={() => onClickPreview()}
                        onClickEdit={() => onClickEdit()} />
                    : <SubtitleForm
                        {...{ id, text, setText, onSubmit }}
                        inValue={secIn}
                        setInValue={onSetSecIn}
                        outValue={secOut}
                        setOutValue={onSetSecOut}
                        timeRangeAvailable={timeRangeAvailable}
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
    text: PropTypes.string,
    setText: PropTypes.func,
    editing: PropTypes.bool,
    setSecSeek: PropTypes.func,
    secIn: PropTypes.number,
    onSetSecIn: PropTypes.func,
    secOut: PropTypes.number,
    onSetSecOut: PropTypes.func,
    onSubmit: PropTypes.func,
    timeRangeAvailable: PropTypes.bool,
    onSetEditing: PropTypes.func
};

export default memo(WithSubtitle(Subtitle));
