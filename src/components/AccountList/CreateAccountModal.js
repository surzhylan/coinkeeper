import {useState} from "react";

const CreateAccountModal = ({setActive, createAccount}) => {
    const [titleInput, setTitleInput] = useState('');
    const [initialBalanceInput, setInitialBalanceInput] = useState(0);
    const handleSubmit = (e) => {
        e.preventDefault()
        createAccount(titleInput, Number(initialBalanceInput))
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
        setInitialBalanceInput(0)
    }
    return (
        <form>
            <input type={"text"} onChange={e => setTitleInput(e.currentTarget.value)}
                   placeholder="Where do you keep your money?"/>
            <input type={"number"} onChange={e => setInitialBalanceInput(e.currentTarget.value)}
                   placeholder="How much is there?"/>
            <button onClick={handleSubmit}>ADD</button>
            <button onClick={handleCancel}>CANCEL</button>
        </form>
    )
}

export default CreateAccountModal