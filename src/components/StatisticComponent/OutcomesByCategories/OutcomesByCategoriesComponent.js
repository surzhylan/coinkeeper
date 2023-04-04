import TransactionType from "../../../data/models/TransactionType";
import {useState} from "react";
import {Pie} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {getColors} from "../../../data/models/StatisticUtil";
import styles from '../StatisticComponent.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

//Todo: Let user to chose period
const OutcomesByCategoriesComponent = ({transactionList, expenseTypeList}) => {
    const [chartData] = useState({
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
        <div className={styles.outcomeItemDiv}>
            <div className={styles.outcomeTitles}>
                <h5>Outcomes by categories</h5>
                <p className={styles.outcomeTitle1}>Where my money goes?</p>
                <p>For last month: {getTotalAmount()}</p>
            </div>
            <div className={styles.outcomeChart}>
                <Pie
                    data={chartData}
                />
            </div>
        </div>
    )
}

export default OutcomesByCategoriesComponent