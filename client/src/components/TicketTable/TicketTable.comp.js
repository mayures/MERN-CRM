import React from 'react';
import { Table } from 'react-bootstrap';

export const TicketTable = ({ tickets }) => {
    return (
        <Table striped border hover>
            <thead>
                <th>#</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Opened Date</th>
            </thead>
            <tbody>
                {tickets.length ? (tickets.map(row => (
                    <tr>
                        <td>{row.id}</td>
                        <td>{row.subject}</td>
                        <td>{row.status}</td>
                        <td>{row.createdAt}</td>
                    </tr>
                ))) : (
                    <tr>
                        <td colSpan="4" className='text-center'>No ticket show</td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};