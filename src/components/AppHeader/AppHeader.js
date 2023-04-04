import React from 'react';
import styles from './AppHeader.module.css';

const AppHeader = ({user}) => {

    return (
        <div className={styles.navbar}>
            <div className={styles.navbarText}>
                <div className={styles.logoImg}>
                    <img src="logocoin.png" width={"60px"}></img>
                </div>
                <div className={styles.logoText}>
                    <h3>Finance App</h3>
                </div>
            </div>
            <div className={styles.menu}>
                <ul>
                    <li>Incomes</li>
                    <li>Accounts</li>
                    <li>Expenses</li>
                    <li>Charts</li>
                </ul>
            </div>
            {/*{user === null*/}
            {/*    ? <span>Please login</span>*/}
            {/*    : <div>*/}
            {/*        <span>{user.name}</span>*/}
            {/*    </div>}*/}
        </div>
    )
}
export default AppHeader