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
                <header>{incomeSource.title}</header>
                <p>{incomeSource.plannedIncome}</p>
                <p>{getActualIncome()}</p>
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