import PropTypes from 'prop-types';
import WithSubtitle from '../hoc/WithSubtitle';
import { secondsToHms } from '../utils/utils';
import SubtitleForm from '../components/SubtitleForm/SubtitleForm';

function NewSubtitle({
    id,
    text,
    setText,
    secondsIn,
    onSetSecondsIn,
    secondsOut,
    onSetSecondsOut,
    onSubmit,
    isRangeAvailable,
    onCancel
}) {
    const onClickCancel = () => onCancel();
    
    return (
        <SubtitleForm
            {...{ id, text, setText, onSubmit }}
            inValue={secondsIn}
            setInValue={onSetSecondsIn}
            outValue={secondsOut}
            setOutValue={onSetSecondsOut}
            isRangeAvailable={isRangeAvailable}
            formatedIn={secondsToHms(secondsIn)}
            formatedOut={secondsToHms(secondsOut)}
            onClickCancel={() => onClickCancel()}
        />
    )
}

NewSubtitle.propTypes = {
    id: PropTypes.number,
    text: PropTypes.string,
    setText: PropTypes.func,
    secondsIn: PropTypes.number,
    onSetSecondsIn: PropTypes.func,
    secondsOut: PropTypes.number,
    onSetSecondsOut: PropTypes.func,
    onSubmit: PropTypes.func,
    isRangeAvailable: PropTypes.bool,
    onCancel: PropTypes.func
};

export default WithSubtitle(NewSubtitle);
