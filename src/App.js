import {useEffect, useState} from "react";
import IncomeList from "./components/IncomeList/IncomeList";
import AppHeader from "./components/AppHeader/AppHeader";
import AccountList from "./components/AccountList/AccountList";
import TransactionType from "./data/models/TransactionType";
import TransactionList from "./components/TransactionList/TransactionList";
import {createAccount, createIncomeSource, createTransaction, parseUser} from "./data/models/UtilCreateFuncitons";

//Todo: CreateSpendingType()
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
    function addAccount(title, balance) {
        if (title && balance) {
            const updatedUser = {
                ...user,
                accountList: [...user.accountList || [], createAccount(title, balance)]
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
        if (type && source && destination && amount && Date) {
            const updatedUser = {
                ...user,
                transactionList: [...user.transactionList || [], createTransaction(type, source, destination, amount, date)]
            };
            setUser(updatedUser);
            console.log(updatedUser)
        }
    }

    function deleteTransaction() {

    }

    function editTransaction() {

    }

    function getAllIncomeTransactions() {
        return user.transactionList.filter(t => TransactionType.Income === t.type)
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

            <AppHeader user={user}/>
            {user === null
                ? <div>
                    {/*Login and Registration*/}
                </div>
                : <div>
                    <IncomeList incomeSourceList={user.incomeSourceList} addIncome={addIncomeSource}
                                deleteIncomeSource={deleteIncomeSource}
                                editIncomeSource={editIncomeSource} incomeTransactions={getAllIncomeTransactions()}/>
                    <AccountList accountList={user.accountList} addAccount={addAccount}
                                 deleteAccount={deleteAccount}
                                 editAccount={editAccount}/>
                    <TransactionList transactions={user.transactionList} addTransaction={addTransaction}
                                     deleteTransaction={deleteTransaction} editTransaction={editTransaction}/>
                </div>}
        </div>)
}

export default App;
