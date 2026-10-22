import { useEffect, useRef, useState } from 'react'
import TodoItem from './TodoItem';

function App() {
  const [inputText, setInputText] = useState("");
  type Priority = "Petite" | "Moyenne" | "Grande";
  const [priority, setPriority] = useState<Priority>("Moyenne");
  const compteur = useRef(0);

  type Todo = {
    id: number,
    name: string,
    priority: Priority;
  }

  function handleInputChange(e: string) {
    setInputText(e);
  }

  const [taskList, setTaskList] = useState<Todo[]>([])

  function addTask() {
    if (!inputText) return;
    const newTask: Todo = {
      id: compteur.current++,
      name: inputText,
      priority: priority
  }

    if (taskList.length == 0) {
      setTaskList([newTask]);
    } else if(!taskList.some(task => task.name === newTask.name && task.priority === newTask.priority)) {
      // The task we are adding doesn't already exists
      // We need to give a new id to the new task
      newTask.id = compteur.current++;
      console.log("Adding to the list");
      setTaskList([...taskList, newTask]);
    }
  }

  return (
    <> 
      <div className="flex flex-col items-center justify-center w-screen h-screen ">
        <div className="bg-primary p-4 flex justify-center items-center gap-20 w-2/3 rounded-lg">
          <input className="input bg-white text-black" type="text" value={inputText} placeholder="Enter a task name" onChange={(e) => handleInputChange(e.target.value)} />
          <select className="bg-white select text-black" defaultValue="Moyenne" onChange={(e) => setPriority(e.target.value as Priority)}> 
            <option>Petite</option>
            <option>Moyenne</option>
            <option>Grande</option>
          </select>
          <button className="btn btn-primary bg-white btn-lg" onClick={() => addTask()}>Add task</button>
        </div>
        <div className="bg-secondary mt-5 p-4 flex flex-col justify-center items-start gap-5 w-2/3 rounded-lg">
            <TodoItem list={taskList}/>
        </div>
      </div>
    </>  
  )
}

export default App
