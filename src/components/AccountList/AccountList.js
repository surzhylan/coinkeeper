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
        let result = accountList.reduce((acc, obj) => acc + obj.initialBalance, 0)
        result += transactionList.reduce((acc, obj) => {
            if (obj.type === TransactionType.Income) return acc + obj.amount
            if (obj.type === TransactionType.Outcome) return acc - obj.amount
        }, 0)
        return result
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
                    return (<AccountItem account={account}
                                         editAccount={editAccount} deleteAccount={deleteAccount}
                                         accountBalance={getAccountBalance(account)}/>)
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