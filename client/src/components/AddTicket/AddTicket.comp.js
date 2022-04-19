import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col, Alert, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { shortCheck } from "../../utils/Validation";
import { newTicket } from "./addTicketAction";
import { resetSuccessMsg } from "./AddTicketSlice";

const infrmdt = {
  subject: "",
  issueDate: "",
  message: "",
};

const infrmdter = {
  subject: false,
  issueDate: false,
  message: false,
};

export const AddTicketForm = () => {
  const [frmdata, setFrmdata] = useState(infrmdt);
  const [frmdter, setFrmdter] = useState(infrmdter);

  const dispatch = useDispatch();
  const {
    user: { name },
  } = useSelector((state) => state.user);

  const { isLoading, error, successMsg } = useSelector(
    (state) => state.newTicket
  );

  useEffect(()=>{
    return ()=>{
      successMsg && dispatch(resetSuccessMsg());
    }
  }, [frmdata, frmdter, dispatch, successMsg]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFrmdata({
      ...frmdata,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setFrmdter(infrmdter);

    const isSubject = await shortCheck(frmdata.subject);

    !isSubject &&
      setFrmdter({
        ...infrmdter,
        subject: !isSubject,
      });

    console.log({...frmdata});
    dispatch(newTicket({ ...frmdata, sender: name }));
  };

  return (
    <div className="jumbotron-addticket">
      <h1 className="text-center text-info">Add New Ticket</h1>
      <hr />
      <div>
        {error && <Alert variant="danger">{error}</Alert>}
        {isLoading && <Spinner variant="info" animation="border" />}
        {successMsg && <Alert variant="success">{successMsg}</Alert>}
      </div>
      <Form onSubmit={handleOnSubmit} className="mt-3">
        <Form.Group className="mb-3" as={Row}>
          <Form.Label column sm={3}>
            Subject
          </Form.Label>
          <Col>
            <Form.Control
              type="text"
              name="subject"
              value={frmdata.subject}
              onChange={handleOnChange}
              placeholder="Subject"
            />
            <Form.Text className="text-danger">
              {frmdter.subject && "Subject is required"}
            </Form.Text>
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" as={Row}>
          <Form.Label column sm={3}>
            Issue Found at
          </Form.Label>
          <Col>
            <Form.Control
              type="date"
              name="issueDate"
              value={frmdata.issueDate}
              onChange={handleOnChange}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" as={Row}>
          <Form.Label column sm={3}>
            Issue
          </Form.Label>
          <Col>
            <Form.Control
              as="textarea"
              name="message"
              value={frmdata.message}
              rows={5}
              onChange={handleOnChange}
              placeholder="Type your issue here"
            />
          </Col>
        </Form.Group>
        <Button type="submit" variant="info" className="text-white col-12">
          open ticket
        </Button>
      </Form>
    </div>
  );
};
