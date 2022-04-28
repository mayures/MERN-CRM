import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Row,
} from "react-bootstrap";

const initialState = {
  name: "",
  phone: "",
  email: "",
  company: "",
  address: "",
  password: "",
  confirmPass: "",
};

const passwordVerificationError = {
  isLenghty: false,
  hasUpper: false,
  hasLower: false,
  hasNumber: false,
  hasSpclChr: false,
  passMatch: false,
};

export const RegistrationForm = () => {
  const [newUser, setNewUser] = useState(initialState);
  const [passwordError, setPasswordError] = useState(passwordVerificationError);

  useEffect(() => {}, [newUser]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });

    if (name === "password") {
      const isLenghty = value.length > 8;
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpclChr = /[@,#,$,%,&]/.test(value);

      setPasswordError({
        ...passwordError,
        isLenghty,
        hasUpper,
        hasLower,
        hasNumber,
        hasSpclChr,
      });
    }

    if (name === "confirmPass") {
      setPasswordError({
        ...passwordError,
        passMatch: newUser.password === value,
      });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDeafault();

    console.log(newUser);
  };

  return (
    <div>
      <Container>
        <Row>
          <Col className="text-center text-info">
            <h1>User Resgistration</h1>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Form autoComplete="off" onSubmit={handleOnSubmit}>
              <FormGroup>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  onChange={handleOnChange}
                  value={newUser.name}
                  name="name"
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  onChange={handleOnChange}
                  value={newUser.phone}
                  name="phone"
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  onChange={handleOnChange}
                  value={newUser.email}
                  name="email"
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Address"
                  onChange={handleOnChange}
                  value={newUser.address}
                  name="address"
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Company Name"
                  onChange={handleOnChange}
                  value={newUser.company}
                  name="company"
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={handleOnChange}
                  value={newUser.password}
                  name="password"
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleOnChange}
                  value={newUser.confirmPass}
                  name="confirmPass"
                />
              </FormGroup>
              <Form.Text>
                {!passwordError.passMatch && (
                  <div className="text-danger mt-3 mb-3">
                    Passwords do not match
                  </div>
                )}
              </Form.Text>

              <ul className="mb-4 mt-3">
                <li
                  className={
                    passwordError.isLenghty ? "text-success" : "text-danger"
                  }
                >
                  Min 8 characters
                </li>
                <li
                  className={
                    passwordError.hasUpper ? "text-success" : "text-danger"
                  }
                >
                  Atleast one Uppercase
                </li>
                <li
                  className={
                    passwordError.hasLower ? "text-success" : "text-danger"
                  }
                >
                  Atleast one Lowercase
                </li>
                <li
                  className={
                    passwordError.hasNumber ? "text-success" : "text-danger"
                  }
                >
                  Atleast One Number
                </li>
                <li
                  className={
                    passwordError.hasSpclChr ? "text-success" : "text-danger"
                  }
                >
                  At least One Special Character @ # $ % &{" "}
                </li>
              </ul>

              <Button
                type="submit"
                variant="info"
                className="text-white col-12 mt-3"
                disabled={Object.values(passwordError).includes(false)}
              >
                Register
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center text-info">Already have an account?
          <p className="text-center"><a href="/" className="text-decoration-none text-info">Login Now!</a></p></Col>
        </Row>
      </Container>
    </div>
  );
};
