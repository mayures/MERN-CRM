import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { Breadcrumbcomp } from "../../components/Breadcrumb/Breadcrumb.comp";
import { Message } from "../../components/message-history/Message.comp";
import { ReplyTicket } from "../../components/reply-ticket/ReplyTicket";
import { useParams } from "react-router-dom";
import {
  closeTicketAction,
  fetchSingleTicket,
} from "../TicketList/ticketsAction";
import { resetResponseMsg } from "../TicketList/ticketSlice";

export const Ticket = () => {
  const { tId } = useParams();
  // const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isLoading, error, selectedTicket, replyMsg, replyTicketError } =
    useSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(fetchSingleTicket(tId));

    return () => {
      dispatch(resetResponseMsg());
    };
  }, [dispatch, tId]);

  // const handleonClose=()=>{
  //   navigate("/tickets")
  // }

  return (
    <Container>
      <Row>
        <Col>
          <Breadcrumbcomp page="Ticket" />
        </Col>
      </Row>
      <Row>
        <Col>
          {isLoading && <Spinner variant="info" aniamtion="border" />}
          {error && <Alert variant="danger">{error}</Alert>}
          {replyTicketError && (
            <Alert variant="danger">{replyTicketError}</Alert>
          )}
          {replyMsg && <Alert variant="success">{replyMsg}</Alert>}
        </Col>
      </Row>
      <Row>
        <Col className="fw-bold text-secondary">
          <div className="subject">Subject: {selectedTicket.subject}</div>
          <div className="date">
            Ticket opened at:{" "}
            {selectedTicket.openAt &&
              new Date(selectedTicket.openAt).toLocaleString()}
          </div>
          <div className="status">Status: {selectedTicket.status}</div>
        </Col>
        <Col className="text-end">
          <Button
            variant="outline-info"
            //onSubmit ={handleonClose}
            onClick={() => dispatch(closeTicketAction(tId))}
            disabled={selectedTicket.status === "ticket closed"}
          >
            Close Ticket
          </Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          {selectedTicket.conversations && (
            <Message msg={selectedTicket.conversations} />
          )}
        </Col>
      </Row>
      <hr />
      <Row className="mt-4">
        <Col>
          <ReplyTicket />
        </Col>
      </Row>
    </Container>
  );
};
