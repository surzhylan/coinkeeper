import {useState} from "react";
import TransactionType from "../../../data/models/TransactionType";
import EditTransactionModal from "./EditTransactionModal";

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
        <div style={{border: "solid 1px yellow"}} onClick={() => setEditMode(true)}>
            <p>{transaction.source.title}</p>
            <p>{transaction.destination.title}</p>
            {getAmountDiv()}
            {(() => {
                if (isEditMode) return <EditTransactionModal transaction={transaction}
                                                             deleteTransaction={deleteTransaction}
                                                             editTransaction={editTransaction}
                                                             sourceList={transaction.type === TransactionType.Income ? incomeSourceList : accountList}
                                                             destinationList={transaction.type === TransactionType.Outcome ? expenseTypeList : accountList}
                                                             setActive={setEditMode}/>
            })()}

        </div>
    )
}
export default TransactionItem