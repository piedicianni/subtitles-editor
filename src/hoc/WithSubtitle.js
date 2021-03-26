import { useState, useContext } from 'react';
import { areOnlyNumbersAndDots } from '../utils/utils';
import { EditorContext } from '../containers/Editor';

const WithSubtitle = WrappedComponent => function Component(props) {
    const [text, setText] = useState(props.text);
    const { setSecIn, secOut, setSecOut } = useContext(EditorContext);

    const onSetSecIn = (value) => {
        if(areOnlyNumbersAndDots(value) && value < secOut) setSecIn(value);
    };
    const onSetSecOut = (value) => areOnlyNumbersAndDots(value) && setSecOut(value);
    const onSubmit = (event) => {
        event.preventDefault();
    };

    Component.displayName = 'WithSubtitle';

    return (
        <WrappedComponent
            {...props}
            {...{ text, setText, onSubmit }}
            onSetSecIn={onSetSecIn}
            onSetSecOut={onSetSecOut}
            defSecIn={props.start}
            defSecOut={props.end}
            defText={props.text}
        />
    )
}

export default WithSubtitle
