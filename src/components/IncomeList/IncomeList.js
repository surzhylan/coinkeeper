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

    let dateStr = new Date().toLocaleString('en-us', {month: 'short', year: 'numeric'})

    return (
        <div>
            <div>
                <div>
                    <h5>Income</h5>
                    <p>{dateStr}</p>
                </div>
                <div>
                    <h5>{getTotalActualIncome()}</h5>
                    <p>Actual Income</p>
                </div>
                <div>
                    <h5>{getTotalPlannedIncome()}</h5>
                    <p>Planned Income</p>
                </div>
            </div>

            <div>
                {incomeSourceList.map(incomeSource => {
                    return (<IncomeItem incomeSource={incomeSource}
                                        transactions={incomeTransactions.filter(t => t.source.id === incomeSource.id)}
                                        editIncomeSource={editIncomeSource} deleteIncomeSource={deleteIncomeSource}/>)
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