import React, { useState } from "react";
import "./login.css";
import { LoginForm } from "../../components/login/login.comp";
import { ResetPassword } from "../../components/passwordReset/PasswordReset.comp";

function Login() {
  const [frm, setFrm] = useState("login");

  const handleOnResetSubmit = (e) => {
    e.preventDefault();
  };

  const formSwitch = (formvalue) => {
    setFrm(formvalue);
  };

  return (
    <div className="login bg-info">
      <div className="jumbotron">
        {frm === "login" && <LoginForm formSwitch={formSwitch} />}

        {frm === "reset" && (
          <ResetPassword
            handleOnResetSubmit={handleOnResetSubmit}
            formSwitch={formSwitch}
          />
        )}
      </div>
    </div>
  );
}

export default Login;
