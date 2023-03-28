import {useState} from "react";
import AccountItem from "./AccountItem/AccountItem";
import CreateAccountModal from "./CreateAccountModal";
import TransactionType from "../../data/models/TransactionType";

const AccountList = ({
                         accountList,
                         addAccount,
                         deleteAccount,
                         editAccount,
                         transactionList
                     }) => {
    const [isCreateMode, setCreateMode] = useState(false)

    function getTotalBalance() {
        return accountList.reduce((sum, a) => {
            let transactionAmount = transactionList.reduce((tSum, t) => {
                if (t.type === TransactionType.Income && t.destination.id === a.id) return tSum + t.amount
                if (t.type === TransactionType.Outcome && t.destination.source === a.id) return tSum - t.amount
                else return tSum
            }, 0)
            return sum + transactionAmount
        }, 0)
    }

    function getAccountBalance(account) {
        let transactionResult = Number(transactionList.reduce((sum, t) => {
            if (t.type === TransactionType.Income && t.destination.id === account.id) return sum + t.amount
            if (t.type === TransactionType.Outcome && t.source.id === account.id) return sum - t.amount
            else return sum
        }, 0))
        return Number(account.initialBalance) + transactionResult
    }

    return (
        <div>
            <div>
                <div>
                    <h5>Accounts</h5>
                </div>
                <div>
                    <span>{getTotalBalance()}</span>
                    <span>Total balance</span>
                </div>
            </div>

            <div>
                {accountList.map(account => {
                    return (<div key={account.id}>
                        <AccountItem account={account}
                                     editAccount={editAccount} deleteAccount={deleteAccount}
                                     accountBalance={getAccountBalance(account)}/>
                    </div>)
                })}
                <button onClick={() => setCreateMode(true)}>Create Account</button>
            </div>
            {(() => {
                if (isCreateMode === true) return <CreateAccountModal setActive={setCreateMode}
                                                                      createAccount={addAccount}/>
            })()}
        </div>
    )
}
export default AccountList