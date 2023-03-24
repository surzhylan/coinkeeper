import {useState} from "react";

const Login = ({submit, toRegistration}) => {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const handleEmailChange = (e) => {
        setEmailInput(e.currentTarget.value)
    }
    const handlePasswordChange = (e) => {
        setPasswordInput(e.currentTarget.value)
    }
    const handleSubmit = (e) => {

    }

    const handleCancel = () => {
        setEmailInput('')
        setPasswordInput('')
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input
                    type={"email"}
                    placeholder="Email"
                    onChange={handleEmailChange}/>
            </div>
            <div>
                <label>Password:</label>
                <input
                    type={"password"}
                    placeholder="Password"
                    onChange={handlePasswordChange}/>
            </div>
            <button onClick={toRegistration}>Don't have an account? Sign in</button>
            <button type={"submit"}>Login</button>
        </form>
    )
}