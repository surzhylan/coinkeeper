import {useState} from "react";
import AccountItem from "./AccountItem/AccountItem";
import CreateAccountModal from "./CreateAccountModal";
import styles from './AccountList.module.css';
import {Button} from "react-bootstrap";
import {getAccountCurrentBalance, getTotalCurrentBalance} from "../../data/models/UtilCreateFuncitons";

const AccountList = ({
                         accountList,
                         addAccount,
                         deleteAccount,
                         editAccount,
                         transactionList
                     }) => {
    const [isCreateMode, setCreateMode] = useState(false)

    return (
        <div>
            <div className={styles.accountList}>
                <div className={styles.accountTitle}>
                    <h5>Accounts</h5>
                </div>
                <div className={styles.accountBalance}>
                    <div className={styles.accountBalanceText}>
                        <span>{getTotalCurrentBalance(accountList, transactionList)}</span>
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
                                     accountBalance={getAccountCurrentBalance(account, transactionList)}/>
                    </div>)
                })}
                <div className={styles.accountListDivButton}>
                    <Button variant="dark" onClick={() => setCreateMode(true)}>Create Account</Button>
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