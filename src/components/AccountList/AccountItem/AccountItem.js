import {useState} from "react";
import EditAccountModal from "./EditAccountModal";

const AccountItem = ({account, editAccount, deleteAccount}) => {
    const [isEditMode, setEditMode] = useState(false)

    return (
        <div key={account.id} style={{border: "solid 1px green"}}>
            <div onClick={() => setEditMode(true)}>
                <header>{account.title}</header>
                <p>{account.balance}</p>
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