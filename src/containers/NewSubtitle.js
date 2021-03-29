import PropTypes from 'prop-types';
import WithSubtitle from '../hoc/WithSubtitle';
import { secondsToHms } from '../utils/utils';
import SubtitleForm from '../components/SubtitleForm/SubtitleForm';

function NewSubtitle({
    id,
    text,
    setText,
    secIn,
    onSetSecIn,
    secOut,
    onSetSecOut,
    onSubmit,
    timeRangeAvailable,
    onCancel
}) {
    const onClickCancel = () => onCancel();
    
    return (
        <SubtitleForm
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
    )
}

NewSubtitle.propTypes = {
    id: PropTypes.number,
    text: PropTypes.string,
    setText: PropTypes.func,
    secIn: PropTypes.number,
    onSetSecIn: PropTypes.func,
    secOut: PropTypes.number,
    onSetSecOut: PropTypes.func,
    onSubmit: PropTypes.func,
    timeRangeAvailable: PropTypes.bool,
    onCancel: PropTypes.func
};

export default WithSubtitle(NewSubtitle);
