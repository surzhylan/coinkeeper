import React, {useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {
    getTransactionsMonths,
    getTransactionTotalIncomeByMonths, getTransactionTotalOutcomeByMonths, parseLocalMonth
} from "../../../data/models/UtilCreateFuncitons";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
    maintainAspectRatio: false,
};

const MoneyFlowTrend = ({transactions}) => {
    const [monthYears] = useState(getTransactionsMonths(transactions))
    const [data] = useState({
        labels: monthYears.map((my) => parseLocalMonth(my.month) + " " + my.year),
        datasets: [
            {
                label: 'Outcome',
                data: monthYears.map((my) => getTransactionTotalOutcomeByMonths(transactions, my)),
                borderColor: 'rgb(252,78,78)',
                backgroundColor: 'rgba(253,89,89,0.5)',
            },
            {
                label: 'Income',
                data: monthYears.map((my) => getTransactionTotalIncomeByMonths(transactions, my)),
                borderColor: 'rgb(59,235,53)',
                backgroundColor: 'rgba(65,235,53,0.5)',
            },
        ],
    })

    return (
        <div>
            <h5>Cash flow trend</h5>
            <p>By months</p>
            <div style={{height: "400px"}}>
                <Line options={options} data={data}/>
            </div>
        </div>
    )
}

export default MoneyFlowTrend