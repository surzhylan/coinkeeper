import IncomeItem from "../IncomeItem/IncomeItem";
import {IncomeSource} from "../../data/models/IncomeSource";
import type {IncomeListInterface} from "./IncomeListInterface";
import {IncomeTransaction} from "../../data/models/IncomeTransaction";
import {useState} from "react";
import CreateIncomeSourceModal from "../IncomeItem/CreateIncomeSourceModal";

const IncomeList = ({
                        incomeSourceList,
                        incomeTransactions,
                        addIncome,
                        deleteIncomeSource,
                        editIncomeSource,
                    }: IncomeListInterface) => {
    const [isCreateMode, setCreateMode] = useState(false)

    function getTotalActualIncome() {
        let total = incomeTransactions.reduce(
            (acc, obj) => acc + obj.amount, 0,)
        return isNaN(total) ? 0 : total
    }

    function getTotalPlannedIncome() {
        let total = 0
        for (let i of incomeSourceList) {
            total += Number(i.plannedIncome)
        }
        return isNaN(total) ? 0 : total
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
                                        transactions={incomeTransactions.filter(t => t.incomeSource.id === incomeSource.id)}
                                        editIncomeSource={editIncomeSource} deleteIncomeSource={deleteIncomeSource}/>)
                })}
                <button onClick={e => setCreateMode(true)}>Create Income Source</button>
            </div>
            <CreateIncomeSourceModal active={isCreateMode} setActive={setCreateMode}
                                     createIncomeSource={addIncome}/>
        </div>
    )
}
export default IncomeList