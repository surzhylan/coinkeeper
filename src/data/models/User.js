import {v4 as uuidv4} from "uuid";
import {IncomeSource} from "./IncomeSource";
import {Account} from "./Account";

export class User {
    #password: string

    name: string
    email: string
    incomeSourceList: Array<IncomeSource>
    accountList: Array<Account>

    constructor(email, name, password) {
        this.id = uuidv4()
        this.email = email
        this.name = name
        this.password = password
        this.accountList = []
        this.incomeSourceList = []
    }

    addIncome(income: IncomeSource) {
        this.incomeSourceList.push(income)
    }

    addAccount(account: Account) {
        this.accountList.push(account)
    }

    deleteIncome(incomeId: string) {
        return this.incomeSourceList.find(e => e.id === incomeId)
    }

    deleteAccount(accountId: string) {
        return this.accountList.find(e => e.id === accountId)
    }
}