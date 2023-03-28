import {useState} from "react";
import CreateExpenseType from "./CreateExpenseType";
import ExpenseTypeItem from "./ExpenseItem/ExpenseTypeItem";

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
                if (t.destination.id === expenseType.id) return sum + Number(t.amount)
            }, 0
        )
    }

    return (
        <div>
            <div>
                <div>
                    <h5>Expense Types</h5>
                </div>
                <div>
                    <span>{getTotalSpent()}</span>
                    <span>Total Spent</span>
                </div>
                <div>
                    <span>{getTotalRemains()}</span>
                    <span>Total remains</span>
                </div>
                <div>
                    <span>{getTotalBudget()}</span>
                    <span>Total budget</span>
                </div>
            </div>

            <div>
                {expenseTypeList.map(e => {
                    return (<ExpenseTypeItem expenseType={e} deleteExpenseType={deleteExpenseType}
                                             editExpenseType={editExpenseType} spendAmount={getSpentByType(e)}/>)
                })}
                <button onClick={() => setCreateMode(true)}>Create Expense Type</button>
            </div>
            {(() => {
                if (isCreateMode === true) return <CreateExpenseType setActive={setCreateMode}
                                                                     createExpenseType={addExpenseType}/>
            })()}
        </div>
    )
}

export default ExpenseTypeList