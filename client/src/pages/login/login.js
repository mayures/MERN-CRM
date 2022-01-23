import React, { useState } from 'react';
import './login.css';
import { LoginForm } from '../../components/login/login.comp'
import { ResetPassword } from '../../components/passwordReset/PasswordReset.comp';

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [frm, setFrm] = useState('login')

    const handleOnChange = (e) => {
        const { name, value } = e.target

        switch (name) { 
            case 'email':
                setEmail(value)
                break

            case 'password':
                setPassword(value)
                break

            default:
                break
        }

        console.log(name, value)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            return alert("fill up the entire form")
        }

        console.log(email, password);
    }

    const handleOnResetSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            return alert("fill up the entire form")
        }

        console.log(email);
    }

    const formSwitch = formvalue => {
        setFrm(formvalue)
    }

    return (
        <div className='login'>
            <div className='jumbotron'>

                {frm === 'login' && <LoginForm
                    handleOnChange={handleOnChange}
                    handleOnSubmit={handleOnSubmit}
                    formSwitch={formSwitch}
                    email={email}
                    password={password}
                />}

                {frm === 'reset' && <ResetPassword
                    handleOnChange={handleOnChange}
                    handleOnResetSubmit={handleOnResetSubmit}
                    formSwitch={formSwitch}
                    email={email}
                />}

            </div>
        </div>
    )
};

export default Login;