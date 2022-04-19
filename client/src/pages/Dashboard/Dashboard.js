import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { TicketTable } from "../../components/TicketTable/TicketTable.comp";
import { Breadcrumbcomp } from "../../components/Breadcrumb/Breadcrumb.comp";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTickets } from "../TicketList/ticketsAction";

export const Dashboard = () => {
  const dispatch = useDispatch();

  const { tickets } = useSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(fetchAllTickets());
  }, [dispatch]);

  const totalTickets = tickets.length;
  const pendingTickets = tickets.filter((row)=>row.status !== "ticket closed")
  return (
    <Container>
      <Breadcrumbcomp page="Dashboard" />
      <Row>
        <Col className="text-center mt-3 mb-2">
          <Link to="/add-ticket">
            <Button
              variant="info"
              style={{ fontSize: "2rem", padding: "10px 30px", color: "white" }}
            >
              Add New Ticket
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col className="text-center mb-2">
          <div>Total Tickets : {totalTickets}</div>
          <div>Pending Tickets : {pendingTickets.length}</div>
        </Col>
      </Row>
      <Row>
        <Col className="mt-2">Recently Added Tickets</Col>
      </Row>
      <hr />
      <Row>
        <Col className="recent tickets">
          <TicketTable />
        </Col>
      </Row>
    </Container>
  );
};
