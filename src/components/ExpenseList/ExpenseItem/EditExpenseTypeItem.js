import {useState} from "react";

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
            <input style={titleInputStyle} type={"text"} value={titleInput}
                   onChange={e => setTitleInput(e.currentTarget.value)}
                   placeholder="What for do your spend money?"/>
            {alertMode ? <span>Required field</span> : ''}
            <input type={"number"} value={spendPlan} onChange={e => setSpendPlan(e.currentTarget.value)}
                   placeholder="Planning to spend per month"/>
            <button onClick={handleSubmit}>SAVE</button>
            <button onClick={handleCancel}>CANCEL</button>
            <button onClick={handleDelete}>DELETE</button>
        </form>
    )
}

export default EditExpenseTypeItem