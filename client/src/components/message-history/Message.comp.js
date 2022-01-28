import React from 'react';
import PropTypes from 'prop-types'
import './messagehistory.css'
import { ReplyTicket } from '../reply-ticket/ReplyTicket';

export const Message = ({ msg }) => {
  if (!msg) return null;

  return msg.map((row, i) => (
      <div key={i} className='message-history mt-3'>
        <div className='send fw-bold text-secondary'>
          <div className='sender'>{row.messageby}</div>
          <div className='date'>{row.date}</div>
        </div>
        <div className='message'>{row.message}</div>
      </div>
  ))
};


Message.protoTypes = {
  msg: PropTypes.array.isRequired,
}
