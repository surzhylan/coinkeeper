import IncomeItem from "./IncomeItem/IncomeItem";
import {useState} from "react";
import CreateIncomeSourceModal from "./CreateIncomeSourceModal";

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
            <div>
                <div>
                    <h5>Income</h5>
                </div>
                <div>
                    <span>{getTotalActualIncome()}</span>
                    <span>Total Actual Income</span>
                </div>
                <div>
                    <span>{getTotalPlannedIncome()}</span>
                    <span>Total Planned Income</span>
                </div>
            </div>

            <div>
                {incomeSourceList.map(incomeSource => {
                    return (
                        <div key={incomeSource.id}>
                            <IncomeItem incomeSource={incomeSource}
                                        transactions={incomeTransactions.filter(t => t.source.id === incomeSource.id)}
                                        editIncomeSource={editIncomeSource} deleteIncomeSource={deleteIncomeSource}/>
                        </div>)
                })}
                <button onClick={() => setCreateMode(true)}>Create Income Source</button>
            </div>
            {(() => {
                if (isCreateMode === true) return <CreateIncomeSourceModal setActive={setCreateMode}
                                                                           createIncomeSource={addIncome}/>
            })()}
        </div>
    )
}
export default IncomeList