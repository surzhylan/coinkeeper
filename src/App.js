import {useCallback, useEffect, useState} from "react";
import IncomeList from "./components/IncomeList/IncomeList";
import {User} from "./data/models/User";
import AppHeader from "./components/AppHeader/AppHeader";
import {IncomeSource} from "./data/models/IncomeSource";
import {Account} from "./data/models/Account";
import AccountItem from "./components/AccountItem/AccountItem";
import AccountList from "./components/AccountList/AccountList";

function App() {
    const savedUser = localStorage.getItem('user')
    const [user, setUser] = useState(savedUser ? JSON.parse(savedUser) : new User('@', 'name', 'password'));

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user])

    //IncomeSource actions
    function addIncome(title, plannedIncome) {
        const updatedUser = {
            ...user,
            incomeSourceList: [...user.incomeSourceList, new IncomeSource(title, plannedIncome)]
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
                accountList: [...user.accountList || [], new Account(title, balance)]
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

    function getAllIncomeTransactions() {
        let transactions = []
        for (let a in user.accountList || []) {
            transactions.push(...a.incomeTransactions || [])
        }
        return transactions
    }

    function createReplenish(amount: number, incomeSource: IncomeSource, comment: string, account: Account) {
        account.replenish(amount, incomeSource, comment)
        let date = Date()

    }

    return (
        <div>
            <button onClick={event => {
                addAccount("Cash", 36000)
            }}>Add Account
            </button>

            <AppHeader user={user}/>
            {user === null
                ? <div>
                    {/*Login and Registration*/}
                </div>
                : <div>
                    <IncomeList incomeSourceList={user.incomeSourceList || []} addIncome={addIncome}
                                deleteIncomeSource={deleteIncomeSource}
                                editIncomeSource={editIncomeSource} incomeTransactions={getAllIncomeTransactions()}/>
                    <AccountList accountList={user.accountList || []} addAccount={addAccount}
                                 deleteAccount={deleteAccount}
                                 editAccount={editAccount}/>

                </div>}
        </div>)
}

export default App;
