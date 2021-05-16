import { useState, useCallback, useEffect } from 'react';
import { areOnlyNumbersAndDots } from '../utils/utils';

const WithSubtitle = WrappedComponent => function Component(props) {
    const [text, setText] = useState(props.text);
    const {
        id,
        editing,
        start: defaultSecondsIn,
        end: defaultSecondsOut,
        text: defaultText,
        onUpdate,
        setSecondsSeek,
        secondsIn,
        setSecondsIn,
        secondsOut,
        setSecondsOut,
        isRangeAvailable,
        ...restProps
    } = props;

    const setDefaultValues = useCallback(() => {
        setSecondsIn(defaultSecondsIn);
        setSecondsOut(defaultSecondsOut);
        setText(defaultText);
    }, [defaultSecondsIn, defaultSecondsOut, defaultText, setSecondsIn, setSecondsOut, setText]);

    const onSetSecondsIn = useCallback((value) => {
        if (areOnlyNumbersAndDots(value)){
            setSecondsIn(value);
            value > secondsOut && setSecondsOut(value + 1);
        }
    }, [secondsOut, setSecondsIn, setSecondsOut]);

    const onSetSecondsOut = useCallback((value) => areOnlyNumbersAndDots(value) && setSecondsOut(value), [setSecondsOut]);

    const onSubmit = (event) => {
        const areSecondsAvailable = isRangeAvailable;
        !areSecondsAvailable && setDefaultValues();
        onUpdate({
            id: id,
            secondsIn: !areSecondsAvailable ? defaultSecondsIn : secondsIn,
            secondsOut: !areSecondsAvailable ? defaultSecondsOut : secondsOut,
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
                defaultSecondsIn,
                defaultSecondsOut,
                defaultText,
                text,
                setText,
                editing,
                setSecondsSeek
            }}
            {...(editing && {
                secondsIn,
                onSetSecondsIn,
                secondsOut,
                onSetSecondsOut,
                onSubmit,
                isRangeAvailable
            })}
            {...restProps}
        />
    )
}

export default WithSubtitle
