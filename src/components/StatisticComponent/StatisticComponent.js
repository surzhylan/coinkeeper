import OutcomesByCategoriesComponent from "./OutcomesByCategories/OutcomesByCategoriesComponent";
import MoneyFlowTrend from "./TrendOfBallanceChange/MoneyFlowTrend";
import BalanceForecast from "./BalanceForecast/BalanceForecast";
import {getTotalCurrentBalance} from "../../data/models/UtilCreateFuncitons";

const StatisticComponent = ({incomeSourceList, accountList, transactionList, expenseTypeList}) => {
    return (
        <div>
            <OutcomesByCategoriesComponent expenseTypeList={expenseTypeList} transactionList={transactionList}/>
            <MoneyFlowTrend transactions={transactionList}/>
            <BalanceForecast incomeSourceList={incomeSourceList}
                             expenseTypeList={expenseTypeList}
                             totalCurrentBalance={getTotalCurrentBalance(accountList, transactionList)}/>
        </div>
    )
}

export default StatisticComponent