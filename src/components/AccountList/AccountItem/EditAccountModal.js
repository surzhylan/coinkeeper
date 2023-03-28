import {useState} from "react";

const EditAccountModal = ({setActive, editAccount, account, deleteAccount, accountBalance}) => {
    const [alertMode, setAlertMode] = useState(false)
    const [titleInput, setTitleInput] = useState(account.title);
    const [balanceInput, setBalanceInput] = useState(accountBalance);
    const titleInputStyle = alertMode ? {border: '1px solid red'} : {}

    const handleSubmit = (e) => {
        e.preventDefault()
        if (titleInput) {
            const changedAccount = account
            changedAccount.title = titleInput
            changedAccount.initialBalance = balanceInput - (accountBalance - account.initialBalance)
            editAccount(changedAccount)
            setActive(false);
        } else setAlertMode(true)
    }
    const handleCancel = (e) => {
        e.preventDefault()
        setActive(false)
        cleanUserInput();
    }
    const cleanUserInput = () => {
        setTitleInput(account.title);
        setBalanceInput(accountBalance)
    }
    const handleDelete = (e) => {
        deleteAccount(account.id)
        e.preventDefault()
        setActive(false)
        cleanUserInput();
    }
    return (
        <form>
            <input style={titleInputStyle} type={"text"} value={titleInput}
                   onChange={e => setTitleInput(e.currentTarget.value)}
                   placeholder="Where do you keep your money?"/>
            {alertMode ? <span>Required field</span> : ''}
            <input type={"number"} value={balanceInput} onChange={e => setBalanceInput(e.currentTarget.value)}
                   placeholder="How much is there?"/>
            <button onClick={handleSubmit}>SAVE</button>
            <button onClick={handleCancel}>CANCEL</button>
            <button onClick={handleDelete}>DELETE</button>
        </form>
    )
}

export default EditAccountModal