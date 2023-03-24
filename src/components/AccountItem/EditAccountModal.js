import {useState} from "react";

const EditAccountModal = ({active, setActive, editAccount, account, deleteAccount}) => {
    const [titleInput, setTitleInput] = useState(account.title);
    const [balance, setBalance] = useState(account.balance);
    const handleSubmit = (e) => {
        const changedAccount = account
        changedAccount.title = titleInput
        changedAccount.balance = balance

        e.preventDefault()
        editAccount(changedAccount)
        setActive(false);
    }
    const handleCancel = (e) => {
        e.preventDefault()
        setActive(false)
        cleanUserInput();
    }
    const cleanUserInput = () => {
        setTitleInput(account.title);
        setBalance(account.balance)
    }
    const handleDelete = (e) => {
        deleteAccount(account.id)
        e.preventDefault()
        setActive(false)
        cleanUserInput();
    }
    return (
        <form hidden={!active}>
            <button onClick={handleDelete}>DELETE</button>
            <input type={"text"} value={titleInput} onChange={e => setTitleInput(e.currentTarget.value)}
                   placeholder="Where do you keep your money?"/>
            <input type={"number"} value={balance} onChange={e => setBalance(e.currentTarget.value)}
                   placeholder="How much is there?"/>
            <button onClick={handleSubmit}>SAVE</button>
            <button onClick={handleCancel}>CANCEL</button>
        </form>
    )
}

export default EditAccountModal