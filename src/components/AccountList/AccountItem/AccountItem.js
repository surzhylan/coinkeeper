import {useState} from "react";
import EditAccountModal from "./EditAccountModal";
import styles from './AccountItem.module.css';

const AccountItem = ({account, editAccount, deleteAccount, accountBalance}) => {
    const [isEditMode, setEditMode] = useState(false)
    return (
        <div /*style={{border: "solid 1px blue"}}*/ className={styles.accountItem1Div}>
            <div onClick={() => setEditMode(true)}>
                <div className={styles.accountItem1}>
                    <div className={styles.title}>
                        <h5>{account.title}</h5>
                    </div>
                    <div className={styles.imageItem}>
                        {account.title === 'Khalyk' ? <img src="khalyk.png"></img> : (account.title === 'Kaspi' ? <img src="kaspi.png"></img> : <img src="wallet.png"></img>)}
                    </div>
                    <div className={styles.balance}>
                        <div className={styles.balanceTextTitle1}>
                            <span>{accountBalance}</span>
                        </div>
                        <div className={styles.balanceTextTitle2}>
                            <span>Balance</span>
                        </div>
                    </div>
                </div>
            </div>
            {(() => {
                if (isEditMode === true) return <EditAccountModal
                    setActive={setEditMode} account={account}
                    editAccount={editAccount}
                    deleteAccount={deleteAccount} accountBalance={accountBalance}/>
            })()}

        </div>
    )
}

export default AccountItem