import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

export const AddTicketForm = ({ handleOnSubmit, handleOnChange, frmdata }) => {
    return (
        <div className='jumbotron-addticket'>
            <h1 className='text-center text-info'>Add New Ticket</h1>
            <hr/>
            <Form onSubmit={handleOnSubmit} className='mt-3'>
                <Form.Group className='mb-3' as={Row}>
                    <Form.Label column sm={3}>Subject</Form.Label>
                    <Col>
                        <Form.Control
                            type="text"
                            name="subject"
                            value={frmdata.subject}
                            // minLength={3}
                            // maxLength={50}
                            onChange={handleOnChange}
                            placeholder='Subject'
                        />
                    </Col>
                </Form.Group>
                <Form.Group className='mb-3' as={Row}>
                    <Form.Label column sm={3}>Issue Found at</Form.Label>
                    <Col>
                        <Form.Control
                            type="date"
                            name="issueDate"
                            value={frmdata.issueDate}
                            onChange={handleOnChange}
                        />
                    </Col>
                </Form.Group>
                <Form.Group className='mb-3' as={Row}>
                    <Form.Label column sm={3}>Issue</Form.Label>
                    <Col>
                        <Form.Control
                            as="textarea"
                            name="issue"
                            value={frmdata.issue}
                            rows={5}
                            onChange={handleOnChange}
                            placeholder='Type your issue here'
                        />
                    </Col>
                </Form.Group>
                <Button type="submit" variant="info" className='text-white col-12'>Submit</Button>
            </Form>
        </div >
    );
};
