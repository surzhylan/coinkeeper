import OutcomesByCategoriesComponent from "./OutcomesByCategories/OutcomesByCategoriesComponent";
import MoneyFlowTrend from "./TrendOfBallanceChange/MoneyFlowTrend";

const StatisticComponent = ({incomeSourceList, accountList, transactionList, expenseTypeList}) => {

    return (
        <div>
            <OutcomesByCategoriesComponent expenseTypeList={expenseTypeList} transactionList={transactionList}/>
            <MoneyFlowTrend transactions={transactionList}/>
        </div>
    )
}

export default StatisticComponent