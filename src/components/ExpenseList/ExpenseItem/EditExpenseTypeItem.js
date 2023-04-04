import {useState} from "react";
import styles from './ExpenseTypeItem.module.css';
import { Button } from "react-bootstrap";

const EditExpenseTypeItem = ({active, setActive, editExpenseType, expenseType, deleteExpenseType}) => {
    const [titleInput, setTitleInput] = useState(expenseType.title);
    const [spendPlan, setSpendPlan] = useState(expenseType.spendPlan);
    const [alertMode, setAlertMode] = useState(false)
    const titleInputStyle = alertMode ? {border: '1px solid red'} : {}
    const handleSubmit = (e) => {
        e.preventDefault()
        if (titleInput) {
            const changedExpenseType = expenseType
            changedExpenseType.title = titleInput
            changedExpenseType.spendPlan = spendPlan
            editExpenseType(changedExpenseType)
            setActive(false);
        } else setAlertMode(true)
    }
    const handleCancel = (e) => {
        e.preventDefault()
        setActive(false)
        cleanUserInput();
    }
    const cleanUserInput = () => {
        setTitleInput(expenseType.title);
        setSpendPlan(expenseType.spendPlan)
    }
    const handleDelete = (e) => {
        deleteExpenseType(expenseType.id)
        e.preventDefault()
        setActive(false)
        cleanUserInput();
    }
    return (
        <form hidden={!active}>
            <div className={styles.editExpenseDiv}>
                <div className={styles.editExpenseLabel}>
                    <label>Do you want to edit expense?</label>
                </div>
                <div className={styles.editExpenseInputs}>
                    <input style={titleInputStyle} type={"text"} value={titleInput}
                        onChange={e => setTitleInput(e.currentTarget.value)}
                        placeholder="What for do your spend money?"/>
                    {alertMode ? <span>Required field</span> : ''}
                    <input type={"number"} value={spendPlan} onChange={e => setSpendPlan(e.currentTarget.value)}
                        placeholder="Planning to spend per month"/>
                </div>
                <div className={styles.editExpenseButtons}>
                    <Button variant="dark" size="sm" onClick={handleSubmit}>SAVE</Button>
                    <Button variant="dark" size="sm" onClick={handleCancel}>CANCEL</Button>
                    <Button variant="dark" size="sm" onClick={handleDelete}>DELETE</Button>
                </div>
            </div>
        </form>
    )
}

export default EditExpenseTypeItem