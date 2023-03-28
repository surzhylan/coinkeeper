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
            accountList: [],
            incomeSourceList: [],
            transactionList: [],
            expenseTypeList: []
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
        date: date,
    }
}

export function checkDate(transaction) {
    let currDate = new Date().toLocaleDateString("default", {timeZone: "UTC"})
    let tDate = transaction.date.toLocaleDateString("default", {timeZone: "UTC"})
    return currDate === tDate
}

export function parseMonthYear(date) {
    let month = date.toLocaleString('default', {month: 'short'})
    month = month.charAt(0).toUpperCase() + month.slice(1);
    return month + " " + date.getDate()
}

export function getTransactionType(source, destination) {
    if (isIncomeSource(source) && isAccount(destination)) return TransactionType.Income
    if (isAccount(source) && isAccount(destination)) return TransactionType.Transfer
    if (isAccount(source) && isExpenseType(destination)) return TransactionType.Outcome
    else throw Error('Could not determine transaction type')
    //Todo: Add Outcome
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