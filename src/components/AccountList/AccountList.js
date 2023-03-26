import {useState} from "react";
import AccountItem from "./AccountItem/AccountItem";
import CreateAccountModal from "./CreateAccountModal";

const AccountList = ({
                         accountList,
                         addAccount,
                         deleteAccount,
                         editAccount,
                     }) => {
    const [isCreateMode, setCreateMode] = useState(false)

    function getTotalBalance() {
        return accountList.reduce((acc, obj) => acc + Number(obj.balance), 0)
    }

    return (
        <div>
            <div>
                <div>
                    <h5>Accounts</h5>
                </div>
                <div>
                    <p>{getTotalBalance()}</p>
                    <p>Total balance</p>
                </div>
            </div>

            <div>
                {accountList.map(account => {
                    return (<AccountItem account={account}
                                         editAccount={editAccount} deleteAccount={deleteAccount}/>)
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