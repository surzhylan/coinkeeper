import {useState} from "react";
import TransactionItem from "./TransactionItem/TransactionItem";
import CreateTransactionModal from "./CreateTransaction";
import {parseMonthYear} from "../../data/models/UtilCreateFuncitons";

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

    function getTransactionsByDate(date: Date) {
        return transactions.filter(t => t.date === date)
    }



    return (
        <div>
            {getDateList().map(d =>
                <div key={d.getMonth() + " " + d.getDate()}>
                    <h4>{parseMonthYear(d)}</h4>
                    <div>
                        {getTransactionsByDate(d).map(t => <TransactionItem incomeSourceList={incomeSourceList} accountList={accountList} transaction={t}
                                                                            editTransaction={editTransaction}
                                                                            deleteTransaction={deleteTransaction} expenseTypeList={expenseTypeList}/>)}
                    </div>
                </div>)}
            <button onClick={() => setCreateMode(true)}>Create Transaction</button>
            {(() => {
                if (isCreateMode === true) return <CreateTransactionModal
                    setActive={setCreateMode} incomeSourceList={incomeSourceList} accountList={accountList}
                    addTransaction={addTransaction} expenseTypeList={expenseTypeList}/>
            })()}
        </div>
    )
}
export default TransactionList