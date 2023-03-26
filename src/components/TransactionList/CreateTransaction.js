import {useState} from "react";
import TransactionType from "../../data/models/TransactionType";

const CreateTransaction = ({setActive, createTransaction, accountList, expenseTypeList, incomeSourceList}) => {
    const [transactionType, setTransactionType] = useState(TransactionType.Income)
    const [amountInput, setAmountInput] = useState(0);
    const [source, setSource] = useState(incomeSourceList[0] || null)
    const [date, setDate] = useState(new Date())
    const [destination, setDestination] = useState(accountList[0] || null)
    const handleSubmit = (e) => {
        e.preventDefault()
        createTransaction(transactionType, source, destination, amountInput, date)
        cleanUserInput();
        setActive(false);
    }
    const handleCancel = (e) => {
        e.preventDefault()
        cleanUserInput();
        setActive(false)
    }
    const cleanUserInput = () => {
        setTransactionType(TransactionType.Income)
        setAmountInput(0)
        setSource(incomeSourceList[0] || null)
        setDestination(accountList[0] || null)
        setDate(new Date())
    }

    return (
        <form>
            <div>
                {Object.values(TransactionType).map(t => {
                    let background = (t === transactionType) ? 'blue' : ''
                    return <div style={{background: background}}>
                        <span>{t.title}</span>
                    </div>
                })}
            </div>
            <div>
                <span>{transactionType.sign}</span>
            </div>
            <input type={"number"} onChange={e => setAmountInput(e.currentTarget.value)}
                   placeholder="0"/>
            <button onClick={handleSubmit}>ADD</button>
            <button onClick={handleCancel}>CANCEL</button>
        </form>
    )
}

export default CreateTransaction