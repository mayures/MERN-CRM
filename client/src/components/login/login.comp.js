import React from 'react'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types';

export const LoginForm = ({
    handleOnChange,
    handleOnSubmit,
    formSwitch,
    email,
    password
}) => { 
    return (
        <div className='loginform'>
            <Container>
                <Row>
                    <Col>
                        <h1 className='text-info text-center'>Client login</h1>
                        <hr />
                        <Form autoComplete="off" onSubmit={handleOnSubmit}>
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
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={handleOnChange}
                                    placeholder='***********'
                                />
                            </Form.Group>
                            <Button type="submit" variant='info' className='mt-2 col-12 text-white'>Login</Button>
                        </Form>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <a href="#" onClick={()=>formSwitch('reset')}>Forgot Password?</a>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}


LoginForm.propTypes = {
    handleOnChange: PropTypes.func.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
    formSwitch: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}