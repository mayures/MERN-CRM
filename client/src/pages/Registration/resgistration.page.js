import React from "react";
import { RegistrationForm } from "../../components/RegistrationForm/RegistrationForm";
import './registration.css'

export const Resgistration = () => {
  return (
    <div className="registration bg-info">
      <div className="jumbotron-reg">
        <RegistrationForm />
      </div>
    </div>
  );
};
