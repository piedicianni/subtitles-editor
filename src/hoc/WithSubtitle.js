import { useState, useCallback, useEffect } from 'react';
import { areOnlyNumbersAndDots } from '../utils/utils';

const WithSubtitle = WrappedComponent => function Component(props) {
    const [text, setText] = useState(props.text);
    const {
        id,
        editing,
        start: defSecIn,
        end: defSecOut,
        text: defText,
        onUpdate,
        setSecSeek,
        secIn,
        setSecIn,
        secOut,
        setSecOut,
        timeRangeAvailable,
        ...restProps
    } = props;

    const setDefaultValues = useCallback(() => {
        setSecIn(defSecIn);
        setSecOut(defSecOut);
        setText(defText);
    }, [defSecIn, defSecOut, defText, setSecIn, setSecOut, setText]);

    const onSetSecIn = useCallback((value) => {
        if (areOnlyNumbersAndDots(value)){
            setSecIn(value);
            value > secOut && setSecOut(value + 1);
        }
    }, [secOut, setSecIn, setSecOut]);

    const onSetSecOut = useCallback((value) => areOnlyNumbersAndDots(value) && setSecOut(value), [setSecOut]);

    const onSubmit = (event) => {
        const rangeAvail = timeRangeAvailable;
        !rangeAvail && setDefaultValues();
        onUpdate({
            id: id,
            secIn: !rangeAvail ? defSecIn : secIn,
            secOut: !rangeAvail ? defSecOut : secOut,
            text: text
        });
        event.preventDefault();
    };

    useEffect(() => {
        if (!editing) return;
        setDefaultValues();
    }, [editing, setDefaultValues]);

    Component.displayName = 'WithSubtitle';

    return (
        <WrappedComponent
            {...{
                id,
                defSecIn,
                defSecOut,
                defText,
                text,
                setText,
                editing,
                setSecSeek
            }}
            {...(editing && {
                secIn,
                onSetSecIn,
                secOut,
                onSetSecOut,
                onSubmit,
                timeRangeAvailable
            })}
            {...restProps}
        />
    )
}

export default WithSubtitle
