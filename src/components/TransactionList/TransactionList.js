import {useState} from "react";
import TransactionItem from "./TransactionItem/TransactionItem";
import CreateTransaction from "./CreateTransaction";

const TransactionList = ({
                             transactions,
                             addTransaction,
                             deleteTransaction,
                             editTransaction, incomeSourceList, accountList, expenseTypeList
                         }) => {
    const [isCreateMode, setCreateMode] = useState(false)

    function getDateList() {
        let dates = []
        transactions.forEach(t => {
            dates.push(t.date)
        })
        return [...new Set(dates)] || []
    }

    function getIncomeByDate(date: Date) {
        let predicate = (f, s) => {
            return (f.getFullYear() === s.getFullYear && f.getMonth() === s.getMonth() && f.getDate() === s.getDate)
        }
        return transactions.filter(t => predicate(t, date)).reduce(
            (acc, obj) => acc + obj.date, 0)
    }

    function getTransactionsByDate(date: Date) {
        return transactions.filter(t => t.date === date)
    }

    const getMonth = (date) => {
        let result = date.toLocaleString('default', {month: 'short'})
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

    return (
        <div>
            {getDateList().map(d =>
                <div key={d.getMonth() + " " + d.getDate()}>
                    <h4>{getMonth(d) + " " + d.getDate()}</h4>
                    <div>
                        {getTransactionsByDate(d).map(t => <TransactionItem transaction={t}
                                                                            editTransaction={editTransaction}
                                                                            deleteTransaction={deleteTransaction}/>)}
                    </div>
                </div>)}
            {(() => {
                if (isCreateMode === true) return <CreateTransaction
                    setActive={setCreateMode()} incomeSourceList={incomeSourceList} accountList={accountList}
                    createTransaction={addTransaction} expenseTypeList={expenseTypeList}/>
            })()}
        </div>
    )
}
export default TransactionList