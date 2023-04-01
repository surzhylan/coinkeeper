import {useState} from "react";
import { Button } from "react-bootstrap";
import styles from './AccountList.module.css';

const CreateAccountModal = ({setActive, createAccount}) => {
    const [titleInput, setTitleInput] = useState('')
    const [initialBalanceInput, setInitialBalanceInput] = useState(0)
    const [alertMode, setAlertMode] = useState(false)
    const titleInputStyle = alertMode ? {border: '1px solid red'} : {}
    const handleSubmit = (e) => {
        e.preventDefault()
        if (titleInput) {
            createAccount(titleInput, Number(initialBalanceInput))
            cleanUserInput();
            setActive(false);
        } else setAlertMode(true)
    }
    const handleCancel = (e) => {
        e.preventDefault()
        cleanUserInput();
        setActive(false)
    }
    const cleanUserInput = () => {
        setTitleInput("");
        setInitialBalanceInput(0)
    }
    return (
        <form>
            <div className={styles.createForm}>
                <div className={styles.createFormInputs}>
                    <input style={titleInputStyle} type={"text"} onChange={e => setTitleInput(e.currentTarget.value)}
                        placeholder="Where do you keep your money?"/>
                    {alertMode ? <span>Required field</span> : ''}
                    <input type={"number"} onChange={e => setInitialBalanceInput(e.currentTarget.value)}
                        placeholder="How much is there?"/>
                </div>
                <div className={styles.createFormButtons}>
                    <Button variant="dark" size="sm" onClick={handleSubmit}>ADD</Button>
                    <Button variant="dark" size="sm" onClick={handleCancel}>CANCEL</Button>
                </div>
            </div>
        </form>
    )
}

export default CreateAccountModal