import {useState} from "react";

const CreateExpenseType = ({setActive, createExpenseType}) => {
    const [titleInput, setTitleInput] = useState('');
    const [spendPlan, setSpendPlan] = useState(0);
    const handleSubmit = (e) => {
        e.preventDefault()
        createExpenseType(titleInput, Number(spendPlan))
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
        setSpendPlan(0)
    }
    return (
        <form>
            <input type={"text"} onChange={e => setTitleInput(e.currentTarget.value)}
                   placeholder="What for do your spend money?"/>
            <input type={"number"} onChange={e => setSpendPlan(e.currentTarget.value)}
                   placeholder="Planning to spend per month"/>
            <button onClick={handleSubmit}>ADD</button>
            <button onClick={handleCancel}>CANCEL</button>
        </form>
    )
}

export default CreateExpenseType