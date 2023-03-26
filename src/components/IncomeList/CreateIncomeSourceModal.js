import {useState} from "react";

const CreateIncomeSourceModal = ({setActive, createIncomeSource}) => {
    const [titleInput, setTitleInput] = useState('');
    const [incomeInput, setIncomeInput] = useState(0);
    const handleSubmit = (e) => {
        e.preventDefault()
        createIncomeSource(titleInput, incomeInput)
        cleanUserInput();
        setActive(false);
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
            <input type={"text"} onChange={e => setTitleInput(e.currentTarget.value)}
                   placeholder="What is your income?"/>
            <input type={"number"} onChange={e => setIncomeInput(e.currentTarget.value)}
                   placeholder="How much is income per month?"/>
            <button onClick={handleSubmit}>ADD</button>
            <button onClick={handleCancel}>CANCEL</button>
        </form>
    )
}

export default CreateIncomeSourceModal