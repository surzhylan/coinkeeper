import {useState} from "react";

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
            <input style={titleInputStyle} type={"text"} onChange={e => setTitleInput(e.currentTarget.value)}
                   placeholder="What is your income?"/>
            {alertMode ? <span>Required field</span> : ''}
            <input type={"number"} onChange={e => setIncomeInput(e.currentTarget.value)}
                   placeholder="How much is income per month?"/>
            <button onClick={handleSubmit}>ADD</button>
            <button onClick={handleCancel}>CANCEL</button>
        </form>
    )
}

export default CreateIncomeSourceModal