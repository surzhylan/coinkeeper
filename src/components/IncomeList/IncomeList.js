import IncomeItem from "./IncomeItem/IncomeItem";
import {useState} from "react";
import CreateIncomeSourceModal from "./CreateIncomeSourceModal";
import styles from './IncomeList.module.css';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Button } from "react-bootstrap";


const IncomeList = ({
                        incomeSourceList,
                        incomeTransactions,
                        addIncome,
                        deleteIncomeSource,
                        editIncomeSource,
                    }) => {
    const [isCreateMode, setCreateMode] = useState(false)

    function getTotalActualIncome() {
        return incomeTransactions.reduce((acc, obj) => acc + Number(obj.amount), 0)
    }

    function getTotalPlannedIncome() {
        return incomeSourceList.reduce((acc, obj) => acc + Number(obj.plannedIncome), 0)
    }

    return (
        <div>
            <div className={styles.incomeTitle}>
                <div className={styles.title}>
                    <h5>Income</h5>
                </div>
                <div className={styles.text}>
                    <div className={styles.totalIncome}>
                        <div className={styles.totalIncomeText}>
                            <span>{getTotalActualIncome()} tg</span>
                        </div>
                        <div className={styles.totalIncomeTitle}>
                            <span>Total Actual Income</span>
                        </div>
                    </div>
                    <div className={styles.plannedIncome}>
                        <div className={styles.plannedIncomeText}>
                            <span>{getTotalPlannedIncome()} tg</span>
                        </div>
                        <div className={styles.plannedIncomeTitle}>
                            <span>Total Planned Income</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.incomeItemDiv}>
                {incomeSourceList.map(incomeSource => {
                    return (
                        <div key={incomeSource.id} className={styles.incomeItem}>
                            <IncomeItem incomeSource={incomeSource}
                                        transactions={incomeTransactions.filter(t => t.source.id === incomeSource.id)}
                                        editIncomeSource={editIncomeSource} deleteIncomeSource={deleteIncomeSource}/>
                        </div>)
                })}
                <div className={styles.incomeItemDivButton}>
                    <Button variant="light" onClick={() => setCreateMode(true)}><AiOutlinePlusCircle size={70} /></Button>
                    {/*Create Income Source*/}
                </div>
            </div>
            {(() => {
                if (isCreateMode === true) return <CreateIncomeSourceModal setActive={setCreateMode}
                                                                           createIncomeSource={addIncome}></CreateIncomeSourceModal>
            })()}
        </div> 
    )
}
export default IncomeList