import React, { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { replyTicket } from "../../pages/TicketList/ticketsAction";

export const ReplyTicket = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const {
    selectedTicket: { _id, status },
  } = useSelector((state) => state.tickets);
  const {
    user: { name },
  } = useSelector((state) => state.user);
  // const { replyMsg } = useSelector((state) => state.tickets);

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    
    const msgObj = {
      sender: name,
      message,
    };

    dispatch(replyTicket(_id, msgObj));

    setMessage('');
  };

  return (
    <div>
      <Form className="mt-4" onSubmit={handleOnSubmit}>
        <Form.Group as={Row}>
          <Form.Label column className="fw-bold text-secondary">
            Reply:{" "}
          </Form.Label>
          <Form.Control
            as="textarea"
            name="reply"
            value={message}
            rows={5}
            placeholder="Reply here........"
            onChange={handleOnChange}
            onSubmit={handleOnSubmit}
            disabled={status==="ticket closed"}
          />
        </Form.Group>
        <div className="text-end mt-3 mb-3">
          <Button className="text-white" variant="info" type="submit">
            Reply
          </Button>
        </div>
      </Form>
    </div>
  );
};
