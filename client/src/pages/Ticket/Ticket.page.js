import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Breadcrumbcomp } from '../../components/Breadcrumb/Breadcrumb.comp';
import tickets from '../../assets/data/dummy-data.json'
import { Message } from '../../components/message-history/Message.comp';
import { ReplyTicket } from '../../components/reply-ticket/ReplyTicket';
import { useParams } from 'react-router-dom';

export const Ticket = () => {
    const {tid}=useParams();
    const [message, setMessage] = useState('');
    const [ticket, setTicket] = useState('');
    useEffect(() => {
        for(let i=0;i<tickets.length;i++){
            if(tickets[i].id==tid){
                setTicket(tickets[i])
            }
        }
    }, [message]);


    const handleOnChange = (e) => {
        const { value } = e.target;
        setMessage(value)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (!message) {
            return alert("fill the reply")
        }

        alert("reply submitted")
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Breadcrumbcomp page="Ticket" />
                </Col>
            </Row>
            <Row>
                <Col className='fw-bold text-secondary'>
                    <div className='subject'>Subject: {ticket.subject}</div>
                    <div className='date'>Ticket opened at: {ticket.createdAt}</div>
                    <div className='status'>Status: {ticket.status}</div>
                </Col>
                <Col className='text-end'>
                    <Button variant="outline-info">Close Ticket</Button>
                </Col>
            </Row> 
            <Row className='mt-4'>
                <Col>
                    {ticket.history && <Message msg={ticket.history} />}
                </Col>
            </Row>
            <hr />
            <Row className='mt-4'>
                <Col>
                    <ReplyTicket
                        msg={message}
                        handleOnChange={handleOnChange}
                        handleOnSubmit={handleOnSubmit}
                    />
                </Col>
            </Row>
        </Container>
    );
};
