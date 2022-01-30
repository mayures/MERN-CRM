import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { TicketTable } from '../../components/TicketTable/TicketTable.comp';
import tickets from '../../assets/data/dummy-data.json'
import { Breadcrumbcomp } from '../../components/Breadcrumb/Breadcrumb.comp';
import { Link } from 'react-router-dom'

export const Dashboard = () => {
    return (
        <Container>
            <Breadcrumbcomp page="Dashboard" />
            <Row>
                <Col className="text-center mt-3 mb-2">
                    <Link to="/add-ticket"><Button variant='info' style={{ fontSize: '2rem', padding: '10px 30px', color: 'white' }}>Add New Ticket</Button></Link>
                </Col>
            </Row>
            <Row>
                <Col className="text-center mb-2">
                    <div>Total Tickets : 50</div>
                    <div>Pending Tickets : 5</div>
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
