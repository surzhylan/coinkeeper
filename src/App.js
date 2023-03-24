import {useCallback, useEffect, useState} from "react";
import IncomeList from "./components/IncomeList/IncomeList";
import {User} from "./data/models/User";
import AppHeader from "./components/AppHeader/AppHeader";
import {IncomeSource} from "./data/models/IncomeSource";
import {Account} from "./data/models/Account";

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
            console.log(updatedUser)
            setUser(updatedUser)
        }
    }

    //Account actions
    function addAccount(title, balance) {
        if (title && balance) {
            let newUser = user.accountList.push(new Account(title, balance))
            setUser(newUser)
        }
    }

    function getAllIncomeTransactions() {
        let transactions = []
        for (let account of user.accountList) {
            transactions.push(...account.incomeTransactions)
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
                addIncome("Scholarship", 36000)
            }}>Add Income
            </button>

            <AppHeader user={user}/>
            {user === null
                ? <div>
                    {/*Login and Registration*/}
                </div>
                : <div>
                    <IncomeList incomeSourceList={user.incomeSourceList} addIncome={addIncome}
                                deleteIncomeSource={deleteIncomeSource}
                                editIncomeSource={editIncomeSource} incomeTransactions={getAllIncomeTransactions()}/>
                </div>}
        </div>)
}

export default App;
