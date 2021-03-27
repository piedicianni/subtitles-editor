import React from 'react'
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

function SubtitleRow({ id, text, inValue, outValue, onClickEdit = () => {} }) {
    return (
        <Card
            bg='dark'
            text='white'
            className="mb-2 subtitle-row"
        >
            <Card.Body>
                <Card.Title>In: {inValue} Out: {outValue}</Card.Title>
                <Card.Text>{text}</Card.Text>
                <Button variant="outline-light" onClick={onClickEdit}>Modifica</Button>
            </Card.Body>
        </Card>
    )
}

SubtitleRow.propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    inValue: PropTypes.string.isRequired,
    outValue: PropTypes.string.isRequired,
    onClickEdit: PropTypes.func
}

export default SubtitleRow;
