import { useState } from 'react';

const WithSubtitle = WrappedComponent => function Component(props) {
    const [text, setText] = useState(props.text);

    const onSubmit = (event) => {
        event.preventDefault();
    };

    Component.displayName = 'WithSubtitle';

    return (
        <WrappedComponent
            {...props}
            {...{ text, setText, onSubmit }}
            defSecIn={props.start}
            defSecOut={props.end}
            defText={props.text}
        />
    )
}

export default WithSubtitle
