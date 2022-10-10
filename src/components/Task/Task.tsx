import styles from './Task.module.sass'

import { Trash } from 'phosphor-react'

import { useState } from 'react';

interface TaskProps {
    id: string
    content: string
    onDeleteTask: (id : string) => void
    onNewStatus: ( id: string, status : boolean) => void
}

export function Task({ id, content, onDeleteTask, onNewStatus } : TaskProps){

    function handleDeleteTask() {
        onDeleteTask(id)
    }

    const [completeTask, setCompleteTask] = useState(false)
    
    function handleNewStatus(id: string, status: boolean){
        onNewStatus(id, status)
        setCompleteTask(status)
    }
    
    return (
        <>
            <div className={styles.taskContainer}>
                <label className={`${styles.checkboxContainer} ${completeTask && styles.taskComplete}`}>
                        <span className={styles.complete}>{ content }</span>
                        <input
                            className={styles.checkbox}
                            type="checkbox"
                            name=""
                            id=""
                            onChange={(e) => handleNewStatus(id, e.target.checked)}
                        />
                        <span className={styles.checkmark}></span>
                    </label>
                    
                    <button
                        onClick={handleDeleteTask}
                        className={styles.trash}>
                        <Trash size={16}/>
                    </button>
            </div>
        </>
    )
}