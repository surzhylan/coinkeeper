import {useState} from "react";
import AccountItem from "../AccountItem/AccountItem";
import CreateAccountModal from "../AccountItem/CreateAccountModal";

const AccountList = ({
                         accountList,
                         addAccount,
                         deleteAccount,
                         editAccount,
                     }) => {
    const [isCreateMode, setCreateMode] = useState(false)

    function getTotalBalance() {
        let total = 0
        for (let i of accountList) {
            total += Number(i.balance)
        }
        return isNaN(total) ? 0 : total
    }

    return (
        <div>
            <div>
                <div>
                    <h5>Accounts</h5>
                </div>
                <div>
                    <h5>{getTotalBalance()}</h5>
                    <p>Total balance</p>
                </div>
            </div>

            <div>
                {accountList.map(account => {
                    return (<AccountItem account={account}
                                         editAccount={editAccount} deleteAccount={deleteAccount}/>)
                })}
                <button onClick={e => setCreateMode(true)}>Create Account</button>
            </div>
            <CreateAccountModal active={isCreateMode} setActive={setCreateMode}
                                createAccount={addAccount}/>
        </div>
    )
}
export default AccountList