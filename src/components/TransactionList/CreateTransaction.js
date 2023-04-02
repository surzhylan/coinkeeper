import {useState} from "react";
import DatePicker from "react-datepicker";
import {getTransactionType, isIncomeSource} from "../../data/models/UtilCreateFuncitons";
import { Button } from "react-bootstrap";
import styles from './TransactionList.module.css'

const CreateTransaction = ({setActive, addTransaction, accountList, expenseTypeList, incomeSourceList}) => {
    const [amountInput, setAmountInput] = useState(0);
    const [dateInput, setDateInput] = useState(new Date())
    const [sourceList, setSourceList] = useState([...incomeSourceList, ...accountList])
    const [destinationList, setDestinationList] = useState(accountList)
    const [sourceInput, setSourceInput] = useState(0)
    const [destinationInput, setDestinationInput] = useState(0)
    const [alertMode, setAlertMode] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!isNaN(amountInput) && dateInput && !isNaN(sourceInput) && !isNaN(destinationInput)) {
            let type = getTransactionType(sourceList[sourceInput], destinationList[destinationInput])
            addTransaction(type, sourceList[sourceInput], destinationList[destinationInput], Number(amountInput), dateInput)
            cleanUserInput();
            setActive(false);
        } else setAlertMode(true)
    }
    const handleCancel = (e) => {
        e.preventDefault()
        cleanUserInput();
        setActive(false)
    }
    const cleanUserInput = () => {
        setAmountInput(0)
        setSourceList([...incomeSourceList, ...accountList])
        setDestinationList(accountList)
        setSourceInput(0)
        setDestinationInput(0)
        setDateInput(new Date())
    }

    const handleSourceChange = (e) => {
        let newSourceI = e.currentTarget.value
        setSourceInput(newSourceI)
        if (isIncomeSource(sourceList[newSourceI])) {
            setDestinationList(accountList.filter(a => a.id !== sourceList[newSourceI].id))
        } else {
            setDestinationList([...accountList.filter(a => a.id !== sourceList[newSourceI].id), ...expenseTypeList
            ])
        }
        setDestinationInput(0)
    }

    return (
        <form onClick={e => e.stopPropagation()}>
            <div className={styles.createTransaction}>
                <div className={styles.createFrom}>
                    <label>
                        From:
                        <select onChange={handleSourceChange}>
                            {sourceList.map((s, i) =>
                                <option key={i} value={i}
                                >{s.title}</option>)}
                        </select>
                    </label>
                </div>
                <div className={styles.createFrom}>
                    <label>
                        To:
                        <select onChange={e => setDestinationInput(e.currentTarget.value)}>
                            {destinationList.map((d, i) =>
                                <option key={i} value={i}
                                >{d.title}</option>)}
                        </select>
                    </label>
                </div>
                <div className={styles.createFrom}>
                    <label>
                        Date:
                        <DatePicker selected={dateInput} onChange={(date) => setDateInput(date)}/>
                    </label>
                </div>
                <div className={styles.createFrom}>
                    <label>
                        Amount:
                        <input type={"number"} value={amountInput} onChange={e => setAmountInput(e.currentTarget.value)}
                            placeholder="How much is income per month?"/>
                    </label>
                </div>
            </div>
            {alertMode ? <span>Fields are required</span> : ''}
            <div className={styles.createButtons}>
                <Button size="sm" onClick={handleSubmit}>SAVE</Button>
                <Button size="sm" onClick={handleCancel}>CANCEL</Button>
            </div>
        </form>
    )
}

export default CreateTransaction