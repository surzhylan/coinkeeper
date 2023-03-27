import {useState} from "react";
import DatePicker from "react-datepicker";
import {getTransactionType, isIncomeSource} from "../../data/models/UtilCreateFuncitons";

const CreateTransaction = ({setActive, addTransaction, accountList, expenseTypeList, incomeSourceList}) => {
    const [amountInput, setAmountInput] = useState(0);
    const [dateInput, setDateInput] = useState(new Date())
    const [sourceList, setSourceList] = useState([...incomeSourceList, ...accountList])
    const [destinationList, setDestinationList] = useState(accountList)
    const [sourceInput, setSourceInput] = useState(0)
    const [destinationInput, setDestinationInput] = useState(0)
    const handleSubmit = (e) => {
        e.preventDefault()
        let type = getTransactionType(sourceList[sourceInput], destinationList[destinationInput])
        addTransaction(type, sourceList[sourceInput], destinationList[destinationInput], Number(amountInput), dateInput)
        cleanUserInput();
        setActive(false);
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
            <label>
                From:
                <select onChange={handleSourceChange}>
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

export default CreateTransaction