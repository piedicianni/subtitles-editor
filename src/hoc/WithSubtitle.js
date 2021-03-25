import { useState } from 'react';

const WithSubtitle = WrappedComponent => function Component(props) {
    const [inValue, setInValue] = useState(props.inValue);
    const [outValue, setOutValue] = useState(props.outValue);
    const [text, setText] = useState(props.text);

    const onSubmit = (event) => {
        event.preventDefault();
    };

    Component.displayName = 'WithSubtitle';

    return (
        <WrappedComponent
            {...props}
            {...{ inValue, setInValue, outValue, setOutValue, text, setText, onSubmit }}
            defInValue={props.inValue}
            defOutValue={props.outValue}
            defText={props.text}
        />
    )
}

export default WithSubtitle
