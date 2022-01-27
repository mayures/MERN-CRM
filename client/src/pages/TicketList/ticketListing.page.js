import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Breadcrumbcomp } from '../../components/Breadcrumb/Breadcrumb.comp'
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { TicketTable } from '../../components/TicketTable/TicketTable.comp';
import tickets from '../../assets/data/dummy-data.json'

export const TicketListing = () => {

    const [str, setStr] = useState('');
    const [display, setDisplay] = useState([tickets]);

    useEffect(() => { }, [str, display]);

    const handleOnChange = (e) => {
        const { value } = e.target;
        //console.log(value)
        setStr(value);
        searchTicket(value);
    }

    const searchTicket = (sttr) => {

        console.log(sttr)

        const displayTickets = tickets.filter((row) => {
            return row.status.includes(sttr)
        })

        console.log(displayTickets)
        setDisplay(displayTickets)

    }

    return (
        <Container>
            <Row>
                <Col>
                    <Breadcrumbcomp page="Ticket List" />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Button variant="info" className='text-white'>Add Ticket</Button>
                </Col>
                <Col className='text-end'>
                    <SearchForm
                        handleOnChange={handleOnChange}
                        str={str}
                    />
                </Col>
            </Row>
            <hr />
            <Row>
                <Col><TicketTable tickets={display} /></Col>
            </Row>
        </Container>
    );
};
