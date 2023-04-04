import OutcomesByCategoriesComponent from "./OutcomesByCategories/OutcomesByCategoriesComponent";
import MoneyFlowTrend from "./TrendOfBallanceChange/MoneyFlowTrend";
import BalanceForecast from "./BalanceForecast/BalanceForecast";
import {getTotalCurrentBalance} from "../../data/models/UtilCreateFuncitons";
import styles from './StatisticComponent.module.css';

const StatisticComponent = ({incomeSourceList, accountList, transactionList, expenseTypeList}) => {
    return (
        <div className={styles.statisticDiv}>
            <div className={styles.outcomeDiv}>
                <OutcomesByCategoriesComponent expenseTypeList={expenseTypeList} transactionList={transactionList}/>
            </div>
            <div className={styles.moneyFlowDiv}>
                <MoneyFlowTrend transactions={transactionList}/>
            </div>
            <div className={styles.balanceForecastDiv}>
                <BalanceForecast incomeSourceList={incomeSourceList}
                                expenseTypeList={expenseTypeList}
                                totalCurrentBalance={getTotalCurrentBalance(accountList, transactionList)}/>
            </div>
        </div>
    )
}

export default StatisticComponent