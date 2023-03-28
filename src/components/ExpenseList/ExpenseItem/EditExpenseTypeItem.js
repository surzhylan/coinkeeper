import {useState} from "react";

const EditExpenseTypeItem = ({active, setActive, editExpenseType, expenseType, deleteExpenseType}) => {
    const [titleInput, setTitleInput] = useState(expenseType.title);
    const [spendPlan, setSpendPlan] = useState(expenseType.spendPlan);
    const handleSubmit = (e) => {
        const changedExpenseType = expenseType
        changedExpenseType.title = titleInput
        changedExpenseType.spendPlan = spendPlan

        e.preventDefault()
        editExpenseType(changedExpenseType)
        setActive(false);
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
            <button onClick={handleDelete}>DELETE</button>
            <input type={"text"} value={titleInput} onChange={e => setTitleInput(e.currentTarget.value)}
                   placeholder="What for do your spend money?"/>
            <input type={"number"} value={spendPlan} onChange={e => setSpendPlan(e.currentTarget.value)}
                   placeholder="Planning to spend per month"/>
            <button onClick={handleSubmit}>SAVE</button>
            <button onClick={handleCancel}>CANCEL</button>
        </form>
    )
}

export default EditExpenseTypeItem