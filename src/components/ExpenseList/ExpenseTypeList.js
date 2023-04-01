import {useState} from "react";
import { Button } from "react-bootstrap";
import CreateExpenseType from "./CreateExpenseType";
import ExpenseTypeItem from "./ExpenseItem/ExpenseTypeItem";
import styles from './ExpenseTypeList.module.css';


const ExpenseTypeList = ({expenseTypeList, addExpenseType, editExpenseType, deleteExpenseType, transactions,}) => {
    const [isCreateMode, setCreateMode] = useState(false)

    function getTotalSpent() {
        return transactions.reduce((sum, t) => sum + Number(t.amount), 0)
    }

    function getTotalRemains() {
        return getTotalBudget() - getTotalSpent()
    }

    function getTotalBudget() {
        return expenseTypeList.reduce((sum, e) => sum + Number(e.spendPlan), 0)
    }

    function getSpentByType(expenseType) {
        return transactions.reduce((sum, t) => {
            if (t.destination.id === expenseType.id) return sum + t.amount
            else return sum
        }, 0)
    }

    return (
        <div>
            <div className={styles.expenseTitle}>
                <div className={styles.title}>
                    <h5>Expense Types</h5>
                </div>
                <div className={styles.text}>
                    <div className={styles.totalSpent}>
                        <div className={styles.totalSpentText}>
                            <span>{getTotalSpent()}</span>
                        </div>
                        <div className={styles.totalSpentTitle}>
                            <span>Total Spent</span>
                        </div>
                    </div>
                    <div className={styles.totalSpent}>
                        <div className={styles.totalSpentText}>
                            <span>{getTotalRemains()}</span>
                        </div>
                        <div className={styles.totalSpentTitle}>
                            <span>Total remains</span>
                        </div>
                    </div>
                    <div className={styles.totalSpent}>
                        <div className={styles.totalSpentText}>
                            <span>{getTotalBudget()}</span>
                        </div>
                       <div className={styles.totalSpentTitle}>
                            <span>Total budget</span>
                       </div>
                    </div>
                </div>
            </div>

            <div className={styles.expenseItemDiv}>
                {expenseTypeList.map(e => {
                    return (<div key={e.id} className={styles.expenseItem}>
                        <ExpenseTypeItem expenseType={e} deleteExpenseType={deleteExpenseType}
                                         editExpenseType={editExpenseType} spendAmount={getSpentByType(e)}/>
                    </div>)
                })}
               <div className={styles.expenseItemDivButton}>
                    <Button variant="light" onClick={() => setCreateMode(true)}>Create Expense Type</Button>
               </div>
            </div>
            {(() => {
                if (isCreateMode === true) return <CreateExpenseType setActive={setCreateMode}
                                                                     createExpenseType={addExpenseType}/>
            })()}
        </div>
    )
}

export default ExpenseTypeList