import {useState} from "react";
import EditExpenseTypeItem from "./EditExpenseTypeItem";

const ExpenseTypeItem = ({expenseType, spendAmount, editExpenseType, deleteExpenseType}) => {
    const [isEditMode, setEditMode] = useState(false)
    const style = (spendAmount > expenseType.spendPlan && expenseType.spendPlan !== null) ? {border: "solid 1px red"} : {border: "solid 1px green"}
    return (
        <div style={style}>
            <div onClick={() => setEditMode(true)}>
                <h5>{expenseType.title}</h5>
                {expenseType.spendPlan === null
                    ? <span></span>
                    : <div>
                        <span>{expenseType.spendPlan}</span>
                        <span>Planning to spend</span>
                    </div>}
                <div>
                    <span>{spendAmount}</span>
                    <span>Spend</span>
                </div>
            </div>
            {(() => {
                if (isEditMode === true) return <EditExpenseTypeItem active={isEditMode}
                                                                     setActive={setEditMode}
                                                                     expenseType={expenseType}
                                                                     editExpenseType={editExpenseType}
                                                                     deleteExpenseType={deleteExpenseType}/>
            })()}

        </div>
    )
}

export default ExpenseTypeItem