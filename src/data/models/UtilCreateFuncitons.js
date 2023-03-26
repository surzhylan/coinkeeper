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
            transactionList: parseTransactionList(userInfo.transactionList)
        }
        : {
            id: uuidv4(),
            name: 'anonymous',
            email: null,
            password: null,
            accountList: [],
            incomeSourceList: [],
            transactionList: []
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

function parseAccountList(accountList) {
    return accountList ? accountList.map(a => parseAccount(a)) : []
}

export function parseAccount(account) {
    return account ? {
        id: account.id,
        title: account.title,
        balance: Number(account.balance),
    } : null
}

export function createAccount(title, balance) {
    return {
        id: uuidv4(),
        title: title,
        balance: balance,
    }
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