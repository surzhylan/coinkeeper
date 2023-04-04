import TransactionType from "../../../data/models/TransactionType";
import {useState} from "react";
import {Pie} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {colors, getColors} from "../../../data/models/StatisticUtil";

ChartJS.register(ArcElement, Tooltip, Legend);

//Todo: Let user to chose period
const OutcomesByCategoriesComponent = ({transactionList, expenseTypeList}) => {
    const [chartData, setChartData] = useState({
        labels: expenseTypeList.map(e => e.title),
        datasets: [{
            data: getTotalByExpenseType(),
            backgroundColor: getColors(getTotalByExpenseType().length)
        }],
        borderWidth: 0
    })

    function getTotalAmount() {
        let date = new Date()
        let filteredTransaction = transactionList.filter(t =>
            t.date.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)
            && t.type === TransactionType.Outcome)
        return filteredTransaction.reduce((sum, t) => sum + Number(t.amount), 0)
    }

    function getTotalByExpenseType() {
        return expenseTypeList.map(e => {
            let result = 0
            transactionList.forEach(t => {
                if (t.type === TransactionType.Outcome
                    && t.destination.id === e.id) result += t.amount
            })
            return result
        })
    }

    return (
        <div>
            <div>
                <h5>Outcomes by categories</h5>
                <p>Where my money goes?</p>
                <p>For last month: {getTotalAmount()}</p>
            </div>
            <div>
                <Pie
                    data={chartData}
                />
            </div>
        </div>
    )
}

export default OutcomesByCategoriesComponent