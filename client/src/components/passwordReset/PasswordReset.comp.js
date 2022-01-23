import React from 'react'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types';

export const ResetPassword = ({ handleOnChange,formSwitch, handleOnResetSubmit, email }) => {
    return (
        <div className='loginform'>
            <Container>
                <Row>
                    <Col>
                        <h1 className='text-info text-center'>Reset Password</h1>
                        <hr />
                        <Form autoComplete="off" onSubmit={handleOnResetSubmit}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleOnChange}
                                    placeholder='Email'
                                />
                            </Form.Group>
                            <Button type="submit">Reset Password</Button>
                        </Form>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <a href="#" onClick={()=>formSwitch('login')}>Login Now</a>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}


ResetPassword.propTypes = {
    handleOnChange: PropTypes.func.isRequired,
    handleOnResetSubmit: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
}