import {useState} from "react";
import styles from './ExpenseTypeList.module.css';
import { Button } from "react-bootstrap";

const CreateExpenseType = ({setActive, createExpenseType}) => {
    const [titleInput, setTitleInput] = useState('');
    const [spendPlan, setSpendPlan] = useState('');
    const [alertMode, setAlertMode] = useState(false)
    const titleInputStyle = alertMode ? {border: '1px solid red'} : {}
    const handleSubmit = (e) => {
        e.preventDefault()
        if (titleInput) {
            createExpenseType(titleInput, (spendPlan === '') ? '' : Number(spendPlan))
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
        setSpendPlan(0)
    }

    return (
        <form>
            <div className={styles.createForm}>
                <div className={styles.createFormInputs}>
                    <input style={titleInputStyle} type={"text"} onChange={e => setTitleInput(e.currentTarget.value)}
                        placeholder="What for do your spend money?"/>
                    {alertMode ? <span>Required field</span> : ''}
                    <input type={"number"} onChange={e => setSpendPlan(e.currentTarget.value)}
                        placeholder="Planning to spend per month"/>
                </div>
                <div className={styles.createFormButtons}>
                    <Button variant="dark" size="sm" onClick={handleSubmit}>ADD</Button>
                    <Button variant="dark" size="sm" onClick={handleCancel}>CANCEL</Button>
                </div>
            </div>
        </form>
    )
}

export default CreateExpenseType