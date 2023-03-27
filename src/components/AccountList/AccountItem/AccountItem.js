import {useState} from "react";
import EditAccountModal from "./EditAccountModal";

const AccountItem = ({account, editAccount, deleteAccount, accountBalance}) => {
    const [isEditMode, setEditMode] = useState(false)
    return (
        <div key={account.id} style={{border: "solid 1px green"}}>
            <div onClick={() => setEditMode(true)}>
                <h5>{account.title}</h5>
                <div>
                    <span>Balance</span>
                    <span>{accountBalance}</span>
                </div>
            </div>
            {(() => {
                if (isEditMode === true) return <EditAccountModal
                    setActive={setEditMode} account={account}
                    editAccount={editAccount}
                    deleteAccount={deleteAccount}/>
            })()}

        </div>
    )
}

export default AccountItem