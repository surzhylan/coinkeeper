import {useState} from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import styles from '../TransactionList.module.css';
import { Button } from "react-bootstrap";

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
            <div className={styles.editFormDiv}>
                <div className={styles.editForm}>
                    <div className={styles.editFromTo}>
                        <div className={styles.editFrom}>
                            <label>
                                From:
                                <select defaultValue={sourceInput} onChange={e => setSourceInput(e.currentTarget.value)}>
                                    {sourceList.map((s, i) =>
                                        <option key={i} value={i}
                                        >{s.title}</option>)}
                                </select>
                            </label>
                        </div>
                        <div className={styles.editFrom}>
                            <label>
                                To:
                                <select defaultValue={destinationInput} onChange={e => setDestinationInput(e.currentTarget.value)}>
                                    {destinationList.map((d, i) =>
                                        <option key={i} value={i}
                                        >{d.title}</option>)}
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className={styles.editFrom}>
                        <label className={styles.dateflex}>
                            <label className={styles.date}>Date:</label>
                            <DatePicker className={styles.datePicker} selected={dateInput} onChange={(date) => setDateInput(date)}/>
                        </label>
                    </div>
                    <div className={styles.editFrom}>
                        <label>
                            Amount:
                            <input type={"number"} value={amountInput} onChange={e => setAmountInput(e.currentTarget.value)}
                                placeholder="How much is income per month?"/>
                        </label>
                    </div>
                    {alertMode ? <span>Fields are required</span> : ''}
                </div>
                <div className={styles.editFormButtons}>
                    <Button variant="dark" size="sm" onClick={handleSubmit}>SAVE</Button>
                    <Button variant="dark" size="sm" onClick={handleCancel}>CANCEL</Button>
                    <Button variant="dark" size="sm" onClick={handleDelete}>DELETE</Button>
                </div>
            </div>
        </form>
    )
}

export default EditTransactionModal