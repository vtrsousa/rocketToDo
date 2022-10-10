import { useState, ChangeEvent, FormEvent, InvalidEvent, Fragment } from 'react';

import styles from './TaskList.module.sass'

import { PlusCircle } from 'phosphor-react'
import { Task } from '../Task/Task'

import { v4 as uuidv4 } from 'uuid';

interface Task {
    id: string
    content: string
    status: boolean
}

export function TaskList(){    

    const [tasks, setTasks] = useState<Task[]>([])

    function handleCreateNewTask(event: FormEvent){
        event.preventDefault()

        setTasks([...tasks, {id: uuidv4(), content: newTask, status: false}])
        setNewTask('')
    }

    const [newTask, setNewTask] = useState('')

    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>){
        event.target.setCustomValidity('')

        setNewTask(event.target.value)
    }

    function handleNewStatus(id: string, status: boolean){
        const newStatus = tasks.map((task: Task) => {
            if (task.id == id) {
                return {...task, status: status}
            }
            return task
        });

        setTasks(newStatus)
    }

    function handleNewCreateTaksInvalid(event: InvalidEvent<HTMLInputElement>){
        event.target.setCustomValidity('Este campo é obrigatório')
    }

    function deleteTask(taskToDelete : string){
        const taskWithoutDeletedOne = tasks.filter((task: Task) => {
            return task.id !== taskToDelete
        })

        setTasks(taskWithoutDeletedOne)
    }

    const isNewTaskEmpty = newTask.length === 0

    // const count = tasks.reduce((counter, { status }) => status === false ? counter += 1 : counter, 0)

    const count = tasks.reduce((counter, {status}) => status === true ? counter += 1 : counter, 0)


    return (
        <>
            <div className={styles.formAddTaks}>
                <form onSubmit={handleCreateNewTask}>
                    <input 
                        type='text' 
                        placeholder='Adicione uma nova tarefa'
                        value={newTask}
                        onChange={handleNewTaskChange}
                        onInvalid={handleNewCreateTaksInvalid}
                        required
                    />

                    <button
                        type='submit'
                        disabled={isNewTaskEmpty}
                    >
                        Criar <PlusCircle size={16} />
                    </button>
                </form>
            </div>

            <div className={styles.taskCount}>
                <p>Tarefas criadas <span> {tasks.length} </span></p>
                <p>Concluídas <span> { count } de {tasks.length} </span>
                </p>
            </div>

            
            {
                tasks.map((task: any, index: number) => {
                    return (
                        <Fragment key={index}>
                            <Task
                                key={task.id}
                                id={task.id}
                                content={task.content}
                                onDeleteTask={deleteTask}
                                onNewStatus={handleNewStatus}
                            />
                        </Fragment>
                    )
                    
                })
            }

        </>
    )
}