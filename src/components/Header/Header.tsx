import styles from './Header.module.sass'

import toDoLogo from '../../assets/logoRocketToDo.png'

export function Header(){
    return (
        <>
            <header className={styles.header}>
                <img src={toDoLogo} alt="ToDo" />
            </header>
        </>
    )
}