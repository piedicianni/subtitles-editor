import React from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Col, Button } from 'react-bootstrap';

function SubtitleForm({
    id,
    text,
    setText,
    inValue,
    setInValue,
    outValue,
    setOutValue,
    timeRangeAvailable,
    onSubmit,
    formatedIn = '',
    formatedOut = '',
    onClickCancel = () => { }
}) {
    return (
        <Card
            bg='dark'
            text='white'
            className="mb-2 subtitle-form"
        >
            <Card.Body>
                <Form onSubmit={(e) => onSubmit(e)}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>In: ({formatedIn})</Form.Label>
                            <Form.Control
                                required
                                size="sm"
                                type="text"
                                value={inValue}
                                onChange={e => setInValue(parseFloat(e.target.value))}
                                placeholder="In" />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Out: ({formatedOut})</Form.Label>
                            <Form.Control
                                required
                                size="sm"
                                type="text"
                                value={outValue}
                                onChange={e => setOutValue(parseFloat(e.target.value))}
                                placeholder="Out" />
                        </Form.Group>
                    </Form.Row>
                    {
                        !timeRangeAvailable &&
                            <span className='text-warning'>Range di tempo occupato!</span>
                    }
                    <Form.Group>
                        <Form.Label>Sottotitoli:</Form.Label>
                        <Form.Control
                            required
                            as='textarea'
                            size="sm"
                            type="text"
                            value={text}
                            onChange={e => setText(e.target.value)}
                            placeholder="Sottotitoli" />
                    </Form.Group>
                    <div className='container-buttons'>
                        <Button
                            variant="outline-success"
                            type="submit">Salva</Button>
                        <Button
                            variant="outline-warning"
                            type="submit"
                            onClick={onClickCancel}>Annulla</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    )
}

SubtitleForm.propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    setText: PropTypes.func.isRequired,
    inValue: PropTypes.number.isRequired,
    setInValue: PropTypes.func.isRequired,
    outValue: PropTypes.number.isRequired,
    setOutValue: PropTypes.func.isRequired,
    timeRangeAvailable: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    formatedIn: PropTypes.string,
    formatedOut: PropTypes.string,
    onClickCancel: PropTypes.func
};

export default SubtitleForm;
