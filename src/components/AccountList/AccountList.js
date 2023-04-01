import {useState} from "react";
import AccountItem from "./AccountItem/AccountItem";
import CreateAccountModal from "./CreateAccountModal";
import TransactionType from "../../data/models/TransactionType";
import styles from './AccountList.module.css';
import { Button } from "react-bootstrap";

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
            <div className={styles.accountList}>
                <div className={styles.accountTitle}>
                    <h5>Accounts</h5>
                </div>
                <div className={styles.accountBalance}>
                    <div className={styles.accountBalanceText}>
                        <span>{getTotalBalance()}</span>
                    </div>
                    <div className={styles.accountBalanceTitle}>
                        <span>Total balance</span>
                    </div>
                </div>
            </div>

            <div className={styles.accountListDiv}>
                {accountList.map(account => {
                    return (<div key={account.id} className={styles.accountItem}>
                        <AccountItem account={account}
                                     editAccount={editAccount} deleteAccount={deleteAccount}
                                     accountBalance={getAccountBalance(account)}/>
                    </div>)
                })}
                <div className={styles.accountListDivButton}>
                    <Button onClick={() => setCreateMode(true)}>Create Account</Button>
                </div>
            </div>
            {(() => {
                if (isCreateMode === true) return <CreateAccountModal setActive={setCreateMode}
                                                                      createAccount={addAccount}/>
            })()}
        </div>
    )
}
export default AccountList