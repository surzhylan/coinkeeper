import {useState} from "react";
import EditAccountModal from "./EditAccountModal";

const AccountItem = ({account, editAccount, deleteAccount, accountBalance}) => {
    const [isEditMode, setEditMode] = useState(false)
    return (
        <div style={{border: "solid 1px blue"}}>
            <div onClick={() => setEditMode(true)}>
                <h5>{account.title}</h5>
                <div>
                    <span>{accountBalance}</span>
                    <span>Balance</span>
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