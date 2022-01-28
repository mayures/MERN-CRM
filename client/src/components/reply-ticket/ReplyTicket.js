import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const ReplyTicket = ({msg, handleOnChange, handleOnSubmit}) => {
    return (
        <Form className='mt-4' onSubmit={handleOnSubmit}>
            <Form.Group as={Row}>
                <Form.Label column className='fw-bold text-secondary'>Reply: </Form.Label>
                <Form.Control
                    as="textarea"
                    name="reply"
                    //value={msg}
                    rows={5}
                    placeholder='Reply here........'
                    onChange={handleOnChange}
                    onSubmit={handleOnSubmit}
                />
            </Form.Group>
            <div className='text-end mt-3 mb-3'>
                <Button className='variant-info text-white' type='submit'>Reply</Button>
            </div>
        </Form>
    );
};

ReplyTicket.propTypes = {
    msg: PropTypes.string.isRequired,
    handleOnChange: PropTypes.func.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
}