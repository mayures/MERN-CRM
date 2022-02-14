import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Breadcrumbcomp } from '../../components/Breadcrumb/Breadcrumb.comp'
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { TicketTable } from '../../components/TicketTable/TicketTable.comp';
import { Link } from 'react-router-dom'
import { fetchAllTickets } from './ticketsAction';
import { useDispatch } from 'react-redux'

export const TicketListing = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllTickets())
    }, [dispatch]);

    return (
        <Container>
            <Row>
                <Col>
                    <Breadcrumbcomp page="Ticket List" />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to="/add-ticket"><Button variant="info" className='text-white'>Add Ticket</Button></Link>
                </Col>
                <Col className='text-end'>
                    <SearchForm />
                </Col>
            </Row>
            <hr />
            <Row>
                <Col><TicketTable /></Col>
            </Row>
        </Container>
    );
};
