import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AddTicketForm } from '../../components/AddTicket/AddTicket.comp';
import { Breadcrumbcomp } from '../../components/Breadcrumb/Breadcrumb.comp';

export const AddTicket = () => {
  return (
    <Container>
      <Row>
        <Breadcrumbcomp page="New Ticket" />
      </Row>
      <Row>
        <Col>
          <AddTicketForm/>
        </Col>
      </Row>
    </Container>
  );
};


