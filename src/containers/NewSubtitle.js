import { useContext } from 'react';
import PropTypes from 'prop-types';
import WithSubtitle from '../hoc/WithSubtitle';
import { EditorContext } from './Editor';
import { secondsToHms, everyArrayIndexsAreTrue } from '../utils/utils';
import SubtitleForm from '../components/SubtitleForm/SubtitleForm';

function NewSubtitle({
    id,
    defSecIn,
    defSecOut,
    defText,
    onSetSecIn,
    onSetSecOut,
    text,
    setText,
    onSubmit,
    onCancel
}) {
    const { secIn, secOut, timeRangeAvailable } = useContext(EditorContext);
    const onClickCancel = () => onCancel();
    
    return (
        <SubtitleForm
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
    )
}

NewSubtitle.propTypes = {
    id: PropTypes.number,
    defSecIn: PropTypes.number,
    defSecOut: PropTypes.number,
    defText: PropTypes.string,
    onSetSecIn: PropTypes.func,
    onSetSecOut: PropTypes.func,
    text: PropTypes.string,
    setText: PropTypes.func,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func
};

export default WithSubtitle(NewSubtitle);
