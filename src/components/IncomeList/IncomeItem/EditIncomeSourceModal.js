import {useState} from "react";

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
        <form hidden={!active}>
            <input style={titleInputStyle} type={"text"} value={titleInput}
                   onChange={e => setTitleInput(e.currentTarget.value)}
                   placeholder="What is your income?"/>
            {alertMode ? <span>Required field</span> : ''}
            <input type={"number"} value={incomeInput} onChange={e => setIncomeInput(e.currentTarget.value)}
                   placeholder="How much is income per month?"/>
            <button onClick={handleSubmit}>SAVE</button>
            <button onClick={handleCancel}>CANCEL</button>
            <button onClick={handleDelete}>DELETE</button>
        </form>
    )
}

export default EditIncomeSourceModal