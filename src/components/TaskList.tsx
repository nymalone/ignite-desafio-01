import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (!newTaskTitle) return; // se newTaskFile estiver vazio, return! não pode criar task vazia

    const newTask = {
      id: Math.random(), // id aleatório
      title: newTaskTitle, // value do meu input
      isComplete: false // inicia como false
    }
    
    // criei uma newTask, agora preciso setar ela 
    setTasks(oldState => [...oldState, newTask]) // adiciona newTask ao estado antigo
    setNewTaskTitle('') // reinicia o input 
  }

  function handleToggleTaskCompletion(id: number) {
    const mappedTasks = tasks.map(task => task.id === id ? {
      ...task, // pego a minha task 
      isComplete: !task.isComplete // mudo o estado do complete, se estava true vira false, se false vira true
    } : task )
    setTasks(mappedTasks)
  }

  function handleRemoveTask(id: number) {
    // vou retornar todas as tasks que o id for diferente do que eu to passando
    const filteredTasks = tasks.filter(task => task.id !== id) 
    setTasks(filteredTasks) // mudo o meu estado já eliminando a task selecionada
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}