import {useState} from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'


const EditTransactionModal = ({
                                  setActive,
                                  editTransaction,
                                  transaction,
                                  deleteTransaction,
                                  sourceList,
                                  destinationList
                              }) => {
    const [sourceInput, setSourceInput] = useState(transaction.source);
    const [destinationInput, setDestinationInput] = useState(transaction.destination);
    const [amountInput, setAmountInput] = useState(transaction.amount)
    const [dateInput, setDateInput] = useState(transaction.date)
    const handleSubmit = (e) => {
        const changedTransaction = transaction
        changedTransaction.source = sourceInput
        changedTransaction.destination = destinationInput
        changedTransaction.amount = amountInput
        changedTransaction.date = dateInput
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
        setSourceInput(0);
        setDestinationInput(0)
        setAmountInput(transaction.amount)
    }
    const handleDelete = (e) => {
        deleteTransaction(transaction.id)
        e.preventDefault()
        setActive(false)
        cleanUserInput();
    }

    return (
        <form onClick={e => e.stopPropagation()}>
            <button onClick={handleDelete}>DELETE</button>
            <label>
                From:
                <select onChange={e => setSourceInput(sourceList[e.currentTarget.value])}>
                    {sourceList.map((s, i) =>
                        <option key={i} value={i}
                        >{s.title}</option>)}
                </select>
            </label>
            <label>
                To:
                <select onChange={e => setDestinationInput(destinationList[e.currentTarget.value])}>
                    {destinationList.map((d, i) =>
                        <option key={i} value={i}
                        >{d.title}</option>)}
                </select>
            </label>
            <label>
                Date:
                <DatePicker selected={dateInput} onChange={(date) => setDateInput(date)}/>
            </label>
            <label>
                Amount
                <input type={"number"} value={amountInput} onChange={e => setAmountInput(e.currentTarget.value)}
                       placeholder="How much is income per month?"/>
            </label>
            <button onClick={handleSubmit}>SAVE</button>
            <button onClick={handleCancel}>CANCEL</button>
        </form>
    )
}

export default EditTransactionModal