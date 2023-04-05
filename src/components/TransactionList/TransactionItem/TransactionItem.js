import {useState} from "react";
import TransactionType from "../../../data/models/TransactionType";
import EditTransactionModal from "./EditTransactionModal";
import styles from '../TransactionList.module.css';

const TransactionItem = ({
                             transaction,
                             editTransaction,
                             deleteTransaction,
                             accountList,
                             incomeSourceList,
                             expenseTypeList
                         }) => {
    const [isEditMode, setEditMode] = useState(false)

    function getAmountDiv() {
        switch (transaction.type) {
            case TransactionType.Income:
                return <div>
                    <span>+</span>
                    <span>{transaction.amount}</span>
                </div>
            case TransactionType.Outcome:
                return <div>
                    <span>-</span>
                    <span>{transaction.amount}</span>
                </div>
            case TransactionType.Transfer:
                return <div>
                    <span>{transaction.amount}</span>
                </div>
            default:
                return null
        }
    }

    return (
        <div /*style={{border: "solid 1px yellow"}}*/ onClick={() => setEditMode(true)} className={styles.transactionDiv}>
            <div className={styles.transactionItemDiv}>
                <p className={styles.transactionItemTitle1}>{transaction.source.title}</p>
                <div className={styles.transactionItemTitle2}>
                    <p>{transaction.destination.title}</p>
                </div>
                {getAmountDiv()}
            </div>
            <div className={styles.editTransactionDiv}>
                {(() => {
                    if (isEditMode) return <EditTransactionModal transaction={transaction}
                                                                deleteTransaction={deleteTransaction}
                                                                editTransaction={editTransaction}
                                                                sourceList={transaction.type === TransactionType.Income ? incomeSourceList : accountList}
                                                                destinationList={transaction.type === TransactionType.Outcome ? expenseTypeList : accountList}
                                                                setActive={setEditMode}/>
                })()}
            </div>

        </div>
    )
}
export default TransactionItem