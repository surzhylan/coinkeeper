import {useState} from "react";
import { Button } from "react-bootstrap";
import styles from './IncomeList.module.css';

const CreateIncomeSourceModal = ({setActive, createIncomeSource}) => {
    const [titleInput, setTitleInput] = useState('');
    const [incomeInput, setIncomeInput] = useState('');
    const [alertMode, setAlertMode] = useState(false)
    const titleInputStyle = alertMode ? {border: '1px solid red'} : {}
    const handleSubmit = (e) => {
        e.preventDefault()
        if (titleInput) {
            createIncomeSource(titleInput, incomeInput === '' ? '' : Number(incomeInput))
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
        setIncomeInput(0)
    }
    return (
        <form>
            <div className={styles.createForm}>
                <div className={styles.createFormInputs}>
                    <input style={titleInputStyle} type={"text"} onChange={e => setTitleInput(e.currentTarget.value)}
                        placeholder="What is your income?"/>
                    {alertMode ? <span>Required field</span> : ''}
                    <input type={"number"} onChange={e => setIncomeInput(e.currentTarget.value)}
                        placeholder="How much is income per month?"/>
                </div>
                <div className={styles.createFormButtons}>
                    <Button variant="dark" size="sm" onClick={handleSubmit}>ADD</Button>
                    <Button variant="dark" size="sm" onClick={handleCancel}>CANCEL</Button>
                </div>
            </div>
        </form>
    )
}

export default CreateIncomeSourceModal