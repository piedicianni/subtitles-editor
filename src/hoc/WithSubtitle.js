import { useState, useContext, useCallback, useEffect } from 'react';
import { areOnlyNumbersAndDots } from '../utils/utils';
import { EditorContext } from '../containers/Editor';
import { everyArrayIndexsAreTrue } from '../utils/utils';

const WithSubtitle = WrappedComponent => function Component(props) {
    const [text, setText] = useState(props.text);
    const { setSecIn, secOut, setSecOut, timeRangeAvailable } = useContext(EditorContext);
    const { id, editing, start: defSecIn, end: defSecOut, text: defText, ...restProps } = props;
    
    const setDefaultValues = useCallback(() => {
        setSecIn(defSecIn);
        setSecOut(defSecOut);
        setText(defText);
    }, [defSecIn, defSecOut, defText, setSecIn, setSecOut, setText]);

    const onSetSecIn = useCallback((value) => {
        if (areOnlyNumbersAndDots(value) && value < secOut) setSecIn(value);
    }, [secOut, setSecIn]);

    const onSetSecOut = useCallback((value) => areOnlyNumbersAndDots(value) && setSecOut(value), [setSecOut]);
    
    const onSubmit = useCallback((event) => {
        !everyArrayIndexsAreTrue(timeRangeAvailable) && setDefaultValues();
        // console.log('-> ' + id);
        event.preventDefault();
    }, [timeRangeAvailable, setDefaultValues]);

    useEffect(() => {
        if (!editing) return;
        setDefaultValues();
    }, [editing, setDefaultValues]);

    Component.displayName = 'WithSubtitle';

    return (
        <WrappedComponent
            {...restProps}
            {...{ id, editing, text, setText, onSubmit, defSecIn, defSecOut, defText }}
            onSetSecIn={onSetSecIn}
            onSetSecOut={onSetSecOut}
        />
    )
}

export default WithSubtitle
