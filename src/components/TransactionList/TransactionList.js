import {useState} from "react";
import TransactionItem from "./TransactionItem/TransactionItem";
import CreateTransactionModal from "./CreateTransaction";
import {getTransactionsDays, parseMonthDate} from "../../data/models/UtilCreateFuncitons";
import TransactionType from "../../data/models/TransactionType";
import {Button} from "react-bootstrap";
import styles from './TransactionList.module.css';

const TransactionList = ({
                             transactions,
                             addTransaction,
                             deleteTransaction,
                             editTransaction, incomeSourceList, accountList, expenseTypeList
                         }) => {
    const [isCreateMode, setCreateMode] = useState(false)

    function getTransactionsByDate(date: Date) {
        return transactions.filter(t => {
            return t.date.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)
        })
    }

    function getTotalByDate(filteredTransactions: Array) {
        return filteredTransactions.reduce((sum, t) => {
            if (t.type === TransactionType.Income) return sum + t.amount
            if (t.type === TransactionType.Outcome) return sum - t.amount
            else return sum
        }, 0)
    }

    return (
        <div className={styles.transactionList}>
            <Button onClick={() => setCreateMode(true)}>Create Transaction</Button>
            {(() => {
                if (isCreateMode === true) return <CreateTransactionModal
                    setActive={setCreateMode} incomeSourceList={incomeSourceList} accountList={accountList}
                    addTransaction={addTransaction} expenseTypeList={expenseTypeList}/>
            })()}
            {getTransactionsDays(transactions).map(d =>
                <div key={d}>
                    <h4>{parseMonthDate(d)}</h4>
                    <div>
                        {(() => {
                            let transactionList = getTransactionsByDate(d)
                            let total = getTotalByDate(transactionList)
                            let totalStyle = total < 0 ? {color: 'red'} : {color: 'green'}
                            return <div key={d}>
                                <div>
                                    {transactionList.map(t => <div key={t.id}><TransactionItem
                                        incomeSourceList={incomeSourceList}
                                        accountList={accountList} transaction={t}
                                        editTransaction={editTransaction}
                                        deleteTransaction={deleteTransaction}
                                        expenseTypeList={expenseTypeList}/></div>)}
                                    <div>
                                        <span>Total:</span>
                                        <div style={totalStyle}>
                                            <span>{total < 0 ? '-' : '+'}</span>
                                            <span>{total}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })()}
                    </div>
                </div>)
            }</div>)
}
export default TransactionList