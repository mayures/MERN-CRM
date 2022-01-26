import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const SearchForm = ({handleOnChange, str}) => {

    return (
        <div>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm="3">Search: </Form.Label>
                    <Col sm="9">
                        <Form.Control
                            name="search"
                            onChange={handleOnChange}
                            value={str}
                            placeholder="Search...."
                        /> 
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );

};

SearchForm.propTypes = {
    handleOnChange : PropTypes.func.isRequired,
    str : PropTypes.string.isRequired
}
