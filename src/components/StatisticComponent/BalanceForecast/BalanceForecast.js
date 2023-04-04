import React, {useState} from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import styles from '../StatisticComponent.module.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
    maintainAspectRatio: false,
};

const BalanceForecast = ({incomeSourceList, expenseTypeList, totalCurrentBalance}) => {
    const [period] = useState(3)
    const data = {
        labels: [''],
        datasets: [
            {
                label: 'Initial Balance',
                data: [totalCurrentBalance],
                backgroundColor: 'rgba(0,51,180,0.7)',
            },
            {
                label: 'Planning Income',
                data: [getTotalIncome()],
                backgroundColor: 'rgba(49,197,58,0.7)',
            },
            {
                label: 'Planning Outcome',
                data: [getTotalOutcome()],
                backgroundColor: 'rgba(235,53,53,0.7)',
            },
            {
                label: 'Projected Balance',
                data: [getTotalProjectedBalance()],
                backgroundColor: 'rgba(53,162,235,0.7)',
            },
        ],
    }

    function getTotalProjectedBalance() {
        return (getTotalIncome() - getTotalOutcome())
    }

    function getTotalIncome() {
        return incomeSourceList.reduce((sum, i) => sum + Number(i.plannedIncome), 0) * period
    }

    function getTotalOutcome() {
        return expenseTypeList.reduce((sum, e) => sum + Number(e.spendPlan), 0) * period
    }

    return (
        <div className={styles.balanceItemDiv}>
            <div className={styles.balanceTitles}>
                <h5>Balance Forecast</h5>
                <p className={styles.balanceTitle1}>By next {period} months</p>
            </div>
            <div style={{height: "400px"}} className={styles.balanceChart}>
                <Bar options={options} data={data}/>
            </div>
        </div>
    )
}

export default BalanceForecast