import {useState} from "react";
import EditExpenseTypeItem from "./EditExpenseTypeItem";
import styles from './ExpenseTypeItem.module.css';

const ExpenseTypeItem = ({expenseType, spendAmount, editExpenseType, deleteExpenseType}) => {
    const [isEditMode, setEditMode] = useState(false)
    const style = (spendAmount > expenseType.spendPlan && expenseType.spendPlan !== '') ? {border: "solid 3px red"} : {border: "none"}

    /*function limit(){
        if((spendAmount > expenseType.spendPlan && expenseType.spendPlan !== '')){
            <div  className={styles.limitDiv} >
                <label>Enough money!!</label>
            </div>
        }
    }*/

    return (
        <div>
            <div style={style} className = {styles.expenseItem1Div}>
                <div onClick={() => setEditMode(true)}>
                    <div className={styles.expenseItem1}>
                        <div className={styles.title}>
                            <h5>{expenseType.title}</h5>
                        </div>
                        <div className={styles.imageItemExpense}>
                                {expenseType.title === 'Groceries' ? <img src="grocery.png"></img> : (expenseType.title === 'Transport' ? <img src="transport.png"></img> : (expenseType.title === 'Shopping' ? <img src="shopping.png" className={styles.shoppingImg}></img> : 
                                (expenseType.title === 'Entertainment' ? <img src="entertainment.png"></img> : (expenseType.title === 'Services' ? <img src="services.png"></img> : (expenseType.title === 'FinancialExpenses' ? <img src="finance.png"></img> : <img src="othericon.png"></img>)))))}
                        </div>
                        <div className={styles.amount}>
                            {expenseType.spendPlan === ''
                                ? <span></span>
                                : <div className={styles.amountText}>
                                    <div className={styles.amountTextTitle1}>
                                        <span>{expenseType.spendPlan}</span>
                                    </div>
                                    <div className={styles.amountTextTitle2}>
                                        <span>Planning to spend</span>
                                    </div>
                                </div>
                            }
                            <div className={styles.amountText}>
                                <div className={styles.amountTextTitle1}>
                                    <span>{spendAmount}</span>
                                </div>
                                <div className={styles.amountTextTitle2}>
                                    <span>Spend</span>
                                </div>
                            </div>
                        </div>
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
        </div>
    )
}

export default ExpenseTypeItem