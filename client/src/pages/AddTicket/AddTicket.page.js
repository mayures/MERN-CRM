import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AddTicketForm } from '../../components/AddTicket/AddTicket.comp';
import { Breadcrumbcomp } from '../../components/Breadcrumb/Breadcrumb.comp';
import PropTypes from 'prop-types';

const infrmdt = {
  subject: '',
  issueDate: '',
  issue: ''
}

const infrmdter = {
  subject:false,
  issueDate:false,
  issue:false
}

export const AddTicket = () => {

  const [frmdata, setFrmdata] = useState(infrmdt);
  const [frmdter, setFrmdter] = useState(infrmdter);

  useEffect(() => {}, [frmdata]);  

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFrmdata({
      ...frmdata,
      [name]: value
    })

    setFrmdter({
      ...infrmdter,
      [name]: value
    })

    console.log(name, value)
  }

  const handleOnSubmit = async(e) => {
    e.preventDefault();

    const isSubject = await

    console.log("form submitted", frmdata)

  }

  return (
    <Container>
      <Row>
        <Breadcrumbcomp page="New Ticket" />
      </Row>
      <Row>
        <Col>
          <AddTicketForm
            handleOnChange={handleOnChange}
            handleOnSubmit={handleOnSubmit}
            frmdata={frmdata}
          />
        </Col>
      </Row>
    </Container>
  );
};

AddTicket.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
  frmdata: PropTypes.object.isRequired
}
