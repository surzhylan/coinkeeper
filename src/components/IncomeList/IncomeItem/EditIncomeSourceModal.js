import {useState} from "react";
import { Button } from "react-bootstrap";
import styles from './IncomeItem.module.css';

const EditIncomeSourceModal = ({active, setActive, editIncomeSource, incomeSource, deleteIncomeSource}) => {
    const [titleInput, setTitleInput] = useState(incomeSource.title);
    const [incomeInput, setIncomeInput] = useState(incomeSource.plannedIncome);
    const [alertMode, setAlertMode] = useState(false)
    const titleInputStyle = alertMode ? {border: '1px solid red'} : {}
    const handleSubmit = (e) => {
        e.preventDefault()
        if (titleInput) {
            const changedIncomeSource = incomeSource
            changedIncomeSource.title = titleInput
            changedIncomeSource.plannedIncome = incomeInput === '' ? '' : Number(incomeInput)
            editIncomeSource(changedIncomeSource)
            setActive(false);
        } else setAlertMode(true)
    }
    const handleCancel = (e) => {
        e.preventDefault()
        setActive(false)
        cleanUserInput();
    }
    const cleanUserInput = () => {
        setTitleInput(incomeSource.title);
        setIncomeInput(incomeSource.plannedIncome)
    }
    const handleDelete = (e) => {
        deleteIncomeSource(incomeSource.id)
        e.preventDefault()
        setActive(false)
        cleanUserInput();
    }
    return (
        <div className={styles.editIncome}>
            <form hidden={!active}>
                <div className={styles.editIncomeDiv}>
                    <div className={styles.editIncomeLabel}>
                        <label>Do you want to edit income?</label>
                    </div>
                    <div className={styles.editIncomeInputs}>
                        <input style={titleInputStyle} type={"text"} value={titleInput}
                            onChange={e => setTitleInput(e.currentTarget.value)}
                            placeholder="What is your income?"/>
                        {alertMode ? <span>Required field</span> : ''}
                        <input type={"number"} value={incomeInput} onChange={e => setIncomeInput(e.currentTarget.value)}
                            placeholder="How much is income per month?"/>
                    </div>
                    <div className={styles.editIncomeButtons}>
                        <Button variant="dark" size="sm" onClick={handleSubmit}>SAVE</Button>
                        <Button variant="dark" size="sm" onClick={handleCancel}>CANCEL</Button>
                        <Button variant="dark" size="sm" onClick={handleDelete}>DELETE</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditIncomeSourceModal