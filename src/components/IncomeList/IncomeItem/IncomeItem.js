import {useState} from "react";
import EditIncomeSourceModal from "./EditIncomeSourceModal";

const IncomeItem = ({incomeSource, transactions, editIncomeSource, deleteIncomeSource}) => {
    const [isEditMode, setEditMode] = useState(false)

    function getActualIncome() {
        let total = transactions.reduce(
            (acc, obj) => acc + obj.amount, 0)
        return isNaN(total) ? 0 : total
    }

    return (
        <div key={incomeSource.id} style={{border: "solid 1px red"}}>
            <div onClick={() => setEditMode(true)}>
                <h5>{incomeSource.title}</h5>
                <div>
                    <span>{incomeSource.plannedIncome}</span>
                    <span>Planned income</span>
                </div>
                <div>
                    <span>{getActualIncome()}</span>
                    <span>Actual income</span>
                </div>
            </div>
            {(() => {
                if (isEditMode === true) return <EditIncomeSourceModal active={isEditMode}
                                                                       setActive={setEditMode}
                                                                       incomeSource={incomeSource}
                                                                       editIncomeSource={editIncomeSource}
                                                                       deleteIncomeSource={deleteIncomeSource}/>
            })()}

        </div>
    )
}

export default IncomeItem