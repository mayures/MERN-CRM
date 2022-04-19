import React from "react";
import { Col, Container, Row } from "react-bootstrap";

export const Resgistration = () => {
  return (
    <div className="loginform">
      <Container>
        <Row>
          <Col>
            <h1 className="text-info text-center">Client login</h1>
            <hr />
            {error && (
              <Alert className="text-center" variant="danger">
                {error}
              </Alert>
            )}
            <Form autoComplete="off" onSubmit={handleOnSubmit}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  placeholder="Email"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="***********"
                />
              </Form.Group>
              <Button
                type="submit"
                variant="info"
                className="mt-2 col-12 text-white"
              >
                Login
              </Button>
              <div>
                {isLoading && (
                  <Spinner
                    className="mt-3 m-5"
                    variant="info"
                    animation="border"
                  />
                )}
              </div>
            </Form>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <a href="#" onClick={() => formSwitch("reset")}>
              Forgot Password?
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
