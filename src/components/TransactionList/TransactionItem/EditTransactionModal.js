import {useState} from "react";
import TransactionType from "../../../data/models/TransactionType";

const EditTransactionModal = ({
                                  active,
                                  setActive,
                                  editTransaction,
                                  transaction,
                                  deleteTransaction,
                                  incomeSourceList,
                                  accountList
                              }) => {
    const [sourceInput, setSourceInput] = useState(transaction.source.title);
    const [destinationInput, setDestinationInput] = useState(transaction.destination.title);
    const [amountInput, setAmountInput] = useState(transaction.amount)
    const handleSubmit = (e) => {
        const changedTransaction = transaction
        changedTransaction.source = sourceInput
        changedTransaction.destination = destinationInput
        changedTransaction.amount = amountInput
        e.preventDefault()
        editTransaction(changedTransaction)
        setActive(false);
    }
    const handleCancel = (e) => {
        e.preventDefault()
        setActive(false)
        cleanUserInput();
    }
    const cleanUserInput = () => {
        setSourceInput(transaction.source.title);
        setDestinationInput(transaction.destination.title)
        setAmountInput(transaction.amount)
    }
    const handleDelete = (e) => {
        deleteTransaction(transaction.id)
        e.preventDefault()
        setActive(false)
        cleanUserInput();
    }

    function getSelectSourceList() {
        switch (transaction.type) {
            case TransactionType.Income:
                return incomeSourceList
            case TransactionType.Outcome:
            case TransactionType.Transfer:
                return accountList
            default:
                return []
        }
    }

    return (
        <form hidden={!active}>
            <button onClick={handleDelete}>DELETE</button>
            <select>
                {getSelectSourceList().map(s => <option value={s} title={s.title}/>)}
            </select>
            <input type={"number"} value={amountInput} onChange={e => setAmountInput(e.currentTarget.value)}
                   placeholder="How much is income per month?"/>
            <button onClick={handleSubmit}>SAVE</button>
            <button onClick={handleCancel}>CANCEL</button>
        </form>
    )
}

export default EditTransactionModal