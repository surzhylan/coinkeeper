import {v4 as uuidv4} from "uuid";
import TransactionType from "./TransactionType";

export function parseUser(userInfo) {
    return userInfo
        ? {
            id: userInfo.id,
            name: userInfo.name,
            email: userInfo.email,
            password: userInfo.password,
            accountList: parseAccountList(userInfo.accountList),
            incomeSourceList: parseIncomeSourceList(userInfo.incomeSourceList),
            transactionList: parseTransactionList(userInfo.transactionList),
            expenseTypeList: parseExpenseTypeList(userInfo.expenseTypeList)
        }
        : {
            id: uuidv4(),
            name: 'anonymous',
            email: null,
            password: null,
            accountList: [
                createAccount('Cash', 0)
            ],
            incomeSourceList: [],
            transactionList: [],
            expenseTypeList: [
                createExpenseType('Groceries', ''),
                createExpenseType('Transport', ''),
                createExpenseType('Shopping', ''),
                createExpenseType('Entertainment', ''),
                createExpenseType('Services', ''),
                createExpenseType('FinancialExpenses', '')
            ]
        }
}

function parseIncomeSourceList(incomeSourceList) {
    return incomeSourceList ? incomeSourceList.map(i => parseIncomeSource(i)) : []
}

export function parseIncomeSource(incomeSource) {
    return incomeSource ? {
        id: incomeSource.id,
        title: incomeSource.title,
        plannedIncome: Number(incomeSource.plannedIncome),
    } : null
}

export function createIncomeSource(title: string, plannedIncome: number) {
    return {
        id: uuidv4(),
        title: title,
        plannedIncome: plannedIncome,
    }
}

export function isIncomeSource(obj) {
    return obj.hasOwnProperty('plannedIncome')
}

function parseAccountList(accountList) {
    return accountList ? accountList.map(a => parseAccount(a)) : []
}

export function parseAccount(account) {
    return account ? {
        id: account.id,
        title: account.title,
        initialBalance: Number(account.initialBalance),
    } : null
}

export function createAccount(title, initialBalance) {
    return {
        id: uuidv4(),
        title: title,
        initialBalance: initialBalance,
    }
}

export function getTotalCurrentBalance(accountList, transactionList) {
    return accountList.reduce((sum, a) => {
        let transactionAmount = transactionList.reduce((tSum, t) => {
            if (t.type === TransactionType.Income && t.destination.id === a.id) return tSum + t.amount
            if (t.type === TransactionType.Outcome && t.destination.source === a.id) return tSum - t.amount
            else return tSum
        }, 0)
        return sum + transactionAmount
    }, 0)
}

export function getAccountCurrentBalance(account, transactionList) {
    let transactionAmount = transactionList.reduce((tSum, t) => {
        if (t.type === TransactionType.Income && t.destination.id === account.id) return tSum + t.amount
        if (t.type === TransactionType.Outcome && t.destination.source === account.id) return tSum - t.amount
        else return tSum
    }, 0)
    return Number(account.initialBalance) + transactionAmount
}
export function isAccount(account) {
    return account.hasOwnProperty('initialBalance')
}

function parseTransactionList(transactionList) {
    return transactionList ? transactionList.map(t => parseTransaction(t)) : []
}

export function parseTransaction(transaction) {
    return transaction ? {
        id: transaction.id,
        type: transaction.type,
        amount: Number(transaction.amount),
        source: transaction.source,
        destination: transaction.destination,
        date: new Date(transaction.date)
    } : null
}

export function createTransaction(type: TransactionType, source, destination, amount: number, date: Date) {
    return {
        id: uuidv4(),
        type: type,
        amount: amount,
        source: {
            id: source.id,
            title: source.title
        },
        destination: {
            id: destination.id,
            title: destination.title
        },
        date: new Date(date.setHours(0, 0, 0,)),
    }
}

export function checkDate(date: Date) {
    let currDate = new Date().setHours(0, 0, 0, 0)
    return currDate === date.setHours(0, 0, 0, 0)
}

export function parseMonthDate(date) {
    let month = date.toLocaleString('default', {month: 'short'})
    month = month.charAt(0).toUpperCase() + month.slice(1);
    return month + " " + date.getDate()
}

export function parseMonth(date) {
    let month = date.toLocaleString('default', {month: 'short'})
    return month.charAt(0).toUpperCase() + month.slice(1);
}

export function parseLocalMonth(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber);
    let month = date.toLocaleString('default', {month: 'short'})
    return month.charAt(0).toUpperCase() + month.slice(1);
}

export function getTransactionType(source, destination) {
    if (isIncomeSource(source) && isAccount(destination)) return TransactionType.Income
    if (isAccount(source) && isAccount(destination)) return TransactionType.Transfer
    if (isAccount(source) && isExpenseType(destination)) return TransactionType.Outcome
    else throw Error('Could not determine transaction type')
    //Todo: Add Outcome
}

export function getTransactionsDays(transactions) {
    let dateList = transactions.map(t => new Date(t.date))
    let updatedDateList = []
    for (let date of dateList) {
        if (updatedDateList.findIndex(d => d.setHours(0, 0, 0,) === date.setHours(0, 0, 0, 0)) === -1) updatedDateList.push(date)
    }
    return updatedDateList || []
}

export function getTransactionsMonths(transactions) {
    let transactionDateList = transactions.map(t => t.date)
    let updatedMonthsList = []
    for (let date of transactionDateList) {
        if (updatedMonthsList.length === 0) updatedMonthsList.push({
            month: date.getMonth(),
            year: date.getFullYear()
        })
        else {
            if (updatedMonthsList.findIndex(d => date.getMonth() === d.month && date.getFullYear() === d.year) === -1)
                updatedMonthsList.push({
                    month: date.getMonth(),
                    year: date.getFullYear()
                })
        }
    }
    updatedMonthsList.sort((a, b) =>
        (a.year === b.year) ? a.month - b.month
            : a.year - b.year
    )

    return updatedMonthsList || []
}

// export function getTransactionsTotalByMonths(transactions, monthYear) {
//     let result = 0;
//     transactions.forEach(t => {
//             if (parseMonth(t.date) === monthYear.month
//                 && t.date.getFullYear() === monthYear.year) {
//                 if (t.type === TransactionType.Outcome) result -= t.amount
//                 else if (t.type === TransactionType.Income) result += t.amount
//             }
//         }
//     )
//     return result
// }

export function getTransactionTotalIncomeByMonths(transactions, monthYear) {
    let result = 0;
    transactions.forEach(t => {
            if (t.type === TransactionType.Income
                && t.date.getMonth() === monthYear.month
                && t.date.getFullYear() === monthYear.year)
                result += t.amount
        }
    )
    return result
}

export function getTransactionTotalOutcomeByMonths(transactions, monthYear) {
    let result = 0;
    transactions.forEach(t => {
            if (t.type === TransactionType.Outcome
                && t.date.getMonth() === monthYear.month
                && t.date.getFullYear() === monthYear.year)
                result += t.amount
        }
    )
    return result
}

//Expense operations
function parseExpenseTypeList(expenseTypeList) {
    return expenseTypeList ? expenseTypeList.map(e => parseExpenseType(e)) : []
}

export function parseExpenseType(expenseType) {
    return expenseType ? {
        id: expenseType.id,
        title: expenseType.title,
        spendPlan: expenseType.spendPlan
    } : null
}

export function createExpenseType(title, spendPlan) {
    return {
        id: uuidv4(),
        title: title,
        spendPlan: spendPlan
    }
}

export function isExpenseType(account) {
    return account.hasOwnProperty('spendPlan')
}