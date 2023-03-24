import {useState} from "react";

const CreateAccountModal = ({active, setActive, createAccount}) => {
    const [titleInput, setTitleInput] = useState('');
    const [balanceInput, setBalanceInput] = useState(0);
    const handleSubmit = (e) => {
        e.preventDefault()
        createAccount(titleInput, balanceInput)
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
        setBalanceInput(0)
    }
    return (
        <form hidden={!active}>
            <input type={"text"} onChange={e => setTitleInput(e.currentTarget.value)}
                   placeholder="Where do you keep your money?"/>
            <input type={"number"} onChange={e => setBalanceInput(e.currentTarget.value)}
                   placeholder="How much is there?"/>
            <button onClick={handleSubmit}>ADD</button>
            <button onClick={handleCancel}>CANCEL</button>
        </form>
    )
}

export default CreateAccountModal