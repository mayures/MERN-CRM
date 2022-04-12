import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";

import { userLogin } from "../../api/userApi";
import { loginPending, loginFail, loginSuccess } from "./loginSlice";
import { getuserProfile } from "../../pages/Dashboard/userActions";

export const LoginForm = ({ formSwitch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //useSelector gives us all the states including tickets and login
  //but access specifically login we can pass it into
  const { isLoading, isAuth, error } = useSelector((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        setEmail(value);
        break;

      case "password":
        setPassword(value);
        break;

      default:
        break;
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("fill up the entire form");
    }

    dispatch(loginPending());

    try {
      const isAuth = await userLogin({ email, password });

      if (isAuth.status === "fail") {
        return dispatch(loginFail(isAuth.message));
      }

      dispatch(loginSuccess());
      dispatch(getuserProfile());
      navigate("/dashboard");
    } catch (error) {
      dispatch(loginFail(error.message));
    }
  };
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
