import { Header } from './components/Header/Header'
import { TaskList } from './components/TaskList/TaskList'

import './sass/global.sass'
import styles from './App.module.sass'

function App() {

  return (
    <>
      
        <Header />
        
        <div className={styles.wrapper}>
          <main>
            <TaskList />
          </main>
        </div>

    </>
  )
}

export default App