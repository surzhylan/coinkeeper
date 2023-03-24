import {useState} from "react";
import {IncomeSource} from "../../data/models/IncomeSource";

const EditIncomeSourceModal = ({active, setActive, editIncomeSource, incomeSource, deleteIncomeSource}) => {
    const [titleInput, setTitleInput] = useState(incomeSource.title);
    const [incomeInput, setIncomeInput] = useState(incomeSource.plannedIncome);
    const handleSubmit = (e) => {
        const changedIncomeSource = incomeSource
        changedIncomeSource.title = titleInput
        changedIncomeSource.plannedIncome = incomeInput

        e.preventDefault()
        editIncomeSource(changedIncomeSource)
        setActive(false);
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
            <button onClick={handleDelete}>DELETE</button>
            <input type={"text"} value={titleInput} onChange={e => setTitleInput(e.currentTarget.value)}
                   placeholder="What is your income?"/>
            <input type={"number"} value={incomeInput} onChange={e => setIncomeInput(e.currentTarget.value)}
                   placeholder="How much is income per month?"/>
            <button onClick={handleSubmit}>SAVE</button>
            <button onClick={handleCancel}>CANCEL</button>
        </form>
    )
}

export default EditIncomeSourceModal