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
    const [sourceInput, setSourceInput] = useState(sourceList.findIndex(s => s.id === transaction.source.id))
    const [destinationInput, setDestinationInput] = useState(destinationList.findIndex(s => s.id === transaction.destination.id))
    const [amountInput, setAmountInput] = useState(transaction.amount)
    const [dateInput, setDateInput] = useState(transaction.date)
    const [alertMode, setAlertMode] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(!isNaN(sourceInput) && !isNaN(destinationInput))
        if (!isNaN(amountInput) && dateInput && !isNaN(sourceInput) && !isNaN(destinationInput)) {
            const changedTransaction = transaction
            changedTransaction.source = sourceList[sourceInput]
            changedTransaction.destination = destinationList[destinationInput]
            changedTransaction.amount = Number(amountInput)
            changedTransaction.date = dateInput
            editTransaction(changedTransaction)
            setActive(false);
        } else setAlertMode(true)
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
            <label>
                From:
                <select defaultValue={sourceInput} onChange={e => setSourceInput(e.currentTarget.value)}>
                    {sourceList.map((s, i) =>
                        <option key={i} value={i}
                        >{s.title}</option>)}
                </select>
            </label>
            <label>
                To:
                <select defaultValue={destinationInput} onChange={e => setDestinationInput(e.currentTarget.value)}>
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
            {alertMode ? <span>Fields are required</span> : ''}
            <button onClick={handleSubmit}>SAVE</button>
            <button onClick={handleCancel}>CANCEL</button>
            <button onClick={handleDelete}>DELETE</button>
        </form>
    )
}

export default EditTransactionModal