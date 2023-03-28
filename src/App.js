import {useEffect, useState} from "react";
import IncomeList from "./components/IncomeList/IncomeList";
import AppHeader from "./components/AppHeader/AppHeader";
import AccountList from "./components/AccountList/AccountList";
import TransactionType from "./data/models/TransactionType";
import TransactionList from "./components/TransactionList/TransactionList";
import {
    checkDate,
    createAccount, createExpenseType,
    createIncomeSource,
    createTransaction, parseMonthYear,
    parseUser
} from "./data/models/UtilCreateFuncitons";
import ExpenseTypeList from "./components/ExpenseList/ExpenseTypeList";

//Todo: Не давать сохранять при пустых input
//Todo: CreateExpenseType()
//Todo: Ограничение на траты (на тип траты, на день)
//Todo: график и
//Todo: Refactor to Typescript and MVVM
function App() {
    const savedUser = localStorage.getItem('user')
    const [user, setUser] = useState(parseUser(JSON.parse(savedUser)));

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user])

    //IncomeSource actions
    function addIncomeSource(title, plannedIncome) {
        const updatedUser = {
            ...user,
            incomeSourceList: [...user.incomeSourceList, createIncomeSource(title, plannedIncome)]
        };
        setUser(updatedUser);
    }

    function editIncomeSource(changedIncome) {
        if (changedIncome) {
            let index = user.incomeSourceList.findIndex(i => i.id === changedIncome.id)
            let newList = [...user.incomeSourceList]
            newList[index] = changedIncome

            const updatedUser = {
                ...user,
                incomeSourceList: newList
            };
            setUser(updatedUser)
        }
    }

    function deleteIncomeSource(deletedId) {
        if (deletedId) {
            const updatedUser = {
                ...user,
                incomeSourceList: user.incomeSourceList.filter(i => i.id !== deletedId)
            };
            setUser(updatedUser)
        }
    }

    //Account actions
    function addAccount(title, initialBalance) {
        if (title && initialBalance) {
            const updatedUser = {
                ...user,
                accountList: [...user.accountList || [], createAccount(title, initialBalance)]
            };
            setUser(updatedUser);
        }
    }

    function editAccount(changedAccount) {
        if (changedAccount) {
            let index = user.accountList.findIndex(i => i.id === changedAccount.id)
            let newList = [...user.accountList]
            newList[index] = changedAccount

            const updatedUser = {
                ...user,
                accountList: newList
            };
            setUser(updatedUser)
        }
    }

    function deleteAccount(deletedId) {
        if (deletedId) {
            const updatedUser = {
                ...user,
                accountList: user.accountList.filter(i => i.id !== deletedId)
            };
            setUser(updatedUser)
        }
    }

    //Transaction actions
    function addTransaction(type: TransactionType, source, destination, amount: number, date: Date) {
        //Todo: Add error handling (Source or destination don't exist)
        if (type && source && destination && amount && date) {
            let updatedTransactions = [...user.transactionList || [], createTransaction(type, source, destination, amount, date)]
            const updatedUser = {
                ...user,
                transactionList: updatedTransactions
            };
            setUser(updatedUser);
            console.log(updatedUser)
        }
    }

    function deleteTransaction(deletedId) {
        if (deletedId) {
            const updatedUser = {
                ...user,
                transactionList: user.transactionList.filter(t => t.id !== deletedId)
            };
            setUser(updatedUser)
        }
    }

    function editTransaction(changedTransaction) {
        if (changedTransaction) {
            let index = user.transactionList.findIndex(i => i.id === changedTransaction.id)
            let newList = [...user.transactionList]
            newList[index] = changedTransaction

            const updatedUser = {
                ...user,
                transactionList: newList
            };
            setUser(updatedUser)
        }
    }

    function getIncomeTransactions() {
        return user.transactionList.filter(t => t.type === TransactionType.Income && checkDate(t))
    }

    //ExpenseType actions
    function addExpenseType(title: string, spendPlan: number) {
        if (title && !isNaN(spendPlan) && spendPlan !== null) {
            let updatedExpenseTypes = [...user.expenseTypeList || [], createExpenseType(title, spendPlan)]
            const updatedUser = {
                ...user,
                expenseTypeList: updatedExpenseTypes
            };
            setUser(updatedUser);
        }
    }

    function deleteExpenseType(deletedId) {
        if (deletedId) {
            const updatedUser = {
                ...user,
                expenseTypeList: user.expenseTypeList.filter(t => t.id !== deletedId)
            };
            setUser(updatedUser)
        }
    }

    function editExpenseType(changedExpenseType) {
        if (changedExpenseType) {
            let index = user.expenseTypeList.findIndex(i => i.id === changedExpenseType.id)
            let newList = [...user.expenseTypeList]
            newList[index] = changedExpenseType

            const updatedUser = {
                ...user,
                expenseTypeList: newList
            };
            setUser(updatedUser)
        }
    }

    function getOutcomeTransactions() {
        return user.transactionList.filter(t => t.type === TransactionType.Outcome)
    }

    return (
        <div>
            <button onClick={() => {
                addIncomeSource('Scholarship', 36000)
            }}>Add Income Source Example
            </button>
            <button onClick={() => {
                addAccount('Cash', 500)
            }}>Add Account Example
            </button>
            <button onClick={() => {
                addTransaction(TransactionType.Income, user.incomeSourceList[0], user.accountList[0], 5000, new Date())
            }}>Add Transaction Example
            </button>
            <button onClick={() => {
                addExpenseType('Shopping', 0)
            }}>Add Expense Type Example
            </button>

            <AppHeader user={user}/>
            {user === null
                ? <div>
                    {/*Login and Registration*/}
                </div>
                : <div>
                    <h5>{parseMonthYear(new Date())}</h5>
                    <IncomeList incomeSourceList={user.incomeSourceList} addIncome={addIncomeSource}
                                deleteIncomeSource={deleteIncomeSource}
                                editIncomeSource={editIncomeSource} incomeTransactions={getIncomeTransactions()}/>
                    <AccountList accountList={user.accountList} addAccount={addAccount}
                                 deleteAccount={deleteAccount}
                                 editAccount={editAccount} transactionList={user.transactionList}/>
                    <TransactionList transactions={user.transactionList} addTransaction={addTransaction}
                                     deleteTransaction={deleteTransaction} editTransaction={editTransaction}
                                     accountList={user.accountList} incomeSourceList={user.incomeSourceList}
                                     expenseTypeList={user.expenseTypeList}/>
                    <ExpenseTypeList expenseTypeList={user.expenseTypeList} editExpenseType={editExpenseType}
                                     deleteExpenseType={deleteExpenseType} addExpenseType={addExpenseType}
                                     transactions={getOutcomeTransactions()}/>
                </div>}
        </div>
    )
}

export default App;
