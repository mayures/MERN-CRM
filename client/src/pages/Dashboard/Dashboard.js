import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { TicketTable } from '../../components/TicketTable/TicketTable.comp';
import tickets from '../../assets/data/dummy-data.json'

export const Dashboard = () => {
    return (
        <Container>
            <Row>
                <Col className="text-center mt-5 mb-2">
                    <Button variant='info' style={{fontSize:'2rem', padding:'10px 30px', color:'white'}}>Add New Ticket</Button>
                </Col>
            </Row>
            <Row>
                <Col className="text-center mb-2">
                    <div>Total Tickets : 50</div>
                    <div>Total Pending : 5</div>
                </Col>
            </Row>
            <Row>
                <Col className='mt-2'>Recently Added Tickets</Col>
            </Row>
            <hr />
            <Row>
                <Col className='recent tickets'>
                    <TicketTable tickets={tickets} />
                </Col>
            </Row>
        </Container>
    );
};