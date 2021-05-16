import { memo } from 'react';
import PropTypes from 'prop-types';
import WithSubtitle from '../hoc/WithSubtitle';
import SubtitleForm from '../components/SubtitleForm/SubtitleForm';
import SubtitleRow from '../components/SubtitleRow/SubtitleRow';
import { secondsToHms } from '../utils/utils';

function Subtitle({
    id,
    defaultSecondsIn,
    defaultSecondsOut,
    defaultText,
    text,
    setText,
    editing,
    setSecondsSeek,
    secondsIn,
    onSetSecondsIn,
    secondsOut,
    onSetSecondsOut,
    onSubmit,
    isRangeAvailable,
    onSetEditing
}) {

    const onClickPreview = () => setSecondsSeek(defaultSecondsIn);
    const onClickEdit = () => onSetEditing(id);
    const onClickCancel = () => onSetEditing();
    const checkRangeAvailable = () => {
        if(secondsIn === defaultSecondsIn && secondsOut === defaultSecondsOut) return true;
        return isRangeAvailable;
    };

    return (
        <>
            {
                !editing
                    ? <SubtitleRow
                        id={id}
                        inValue={secondsToHms(defaultSecondsIn)}
                        outValue={secondsToHms(defaultSecondsOut)}
                        text={defaultText}
                        onClickPreview={() => onClickPreview()}
                        onClickEdit={() => onClickEdit()} />
                    : <SubtitleForm
                        {...{ id, text, setText, onSubmit }}
                        inValue={secondsIn}
                        setInValue={onSetSecondsIn}
                        outValue={secondsOut}
                        setOutValue={onSetSecondsOut}
                        isRangeAvailable={checkRangeAvailable()}
                        formatedIn={secondsToHms(secondsIn)}
                        formatedOut={secondsToHms(secondsOut)}
                        onClickCancel={() => onClickCancel()}
                    />
            }
        </>
    )
}

Subtitle.propTypes = {
    id: PropTypes.number,
    defaultSecondsIn: PropTypes.number,
    defaultSecondsOut: PropTypes.number,
    defaultText: PropTypes.string,
    text: PropTypes.string,
    setText: PropTypes.func,
    editing: PropTypes.bool,
    setSecondsSeek: PropTypes.func,
    secondsIn: PropTypes.number,
    onSetSecondsIn: PropTypes.func,
    secondsOut: PropTypes.number,
    onSetSecondsOut: PropTypes.func,
    onSubmit: PropTypes.func,
    isRangeAvailable: PropTypes.bool,
    onSetEditing: PropTypes.func
};

export default memo(WithSubtitle(Subtitle));
