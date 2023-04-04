import {useState} from "react";
import EditIncomeSourceModal from "./EditIncomeSourceModal";
import styles from './IncomeItem.module.css';

const IncomeItem = ({incomeSource, transactions, editIncomeSource, deleteIncomeSource}) => {
    const [isEditMode, setEditMode] = useState(false)

    function getActualIncome() {
        let total = transactions.reduce(
            (acc, obj) => acc + obj.amount, 0)
        return isNaN(total) ? 0 : total
    }

    //const background = (isEditMode === false) ? {backgroundColor: "rgb(192,192,192);",opacity:"0.6;"} : {backgroundColor:"rgb(192,192,192);",opacity:"1;"}

    return (
        <div /*style={background}*/>
            <div style={{border: "solid 1px yellow"}} className={styles.incomeItem1Div}>
            <div onClick={() => setEditMode(true)}>
                <div className={styles.incomeItem1}>
                    <div className={styles.title}>
                        <h5>{incomeSource.title}</h5>
                    </div>
                    <div className={styles.imageItem}>
                        {incomeSource.title === 'Salary' ? <img src="salaryicon.png"></img> : (incomeSource.title === 'Freelance' ? <img src="freelanceicon.png"></img> : <img src="othericon.png"></img>)}
                    </div>
                    <div className={styles.amount}>
                        {incomeSource.plannedIncome === ''
                            ? ''
                            : <div className={styles.amountText}>
                                <div className={styles.amountTextTitle1}>
                                    <span>{incomeSource.plannedIncome}</span>
                                </div>
                                <div className={styles.amountTextTitle2}>
                                    <span>Planned income</span>
                                </div>
                            </div>
                        }
                        <div className={styles.amountText}>
                            <div className={styles.amountTextTitle1}>
                                <span>{getActualIncome()}</span>
                            </div>
                            <div className={styles.amountTextTitle2}>
                                <span>Actual income</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {(() => {
                if (isEditMode === true) return <div className={styles.editIncome}>
                    <EditIncomeSourceModal active={isEditMode}
                                                                       setActive={setEditMode}
                                                                       incomeSource={incomeSource}
                                                                       editIncomeSource={editIncomeSource}
                                                                       deleteIncomeSource={deleteIncomeSource}/>
                </div>
            })()}

        </div>
        </div>
    )
}

export default IncomeItem