import { useEffect, useState } from 'react'
import TodoItem from './TodoItem';

function App() {
  const [inputText, setInputText] = useState("");
  type Priority = "Petite" | "Moyenne" | "Grande";
  const [priority, setPriority] = useState<Priority>("Moyenne");
  
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
      id: Date.now(),
      name: inputText,
      priority: priority
  }

    if (taskList.length == 0) {
      setTaskList([newTask]);
    } else {
      setTaskList([...taskList, newTask]);
    }
  }

  return (
    <> 
      <div className="flex flex-col items-center justify-center w-screen h-screen ">
        <div className="bg-primary p-4 flex justify-center items-center gap-20 w-2/3 rounded-lg">
          <input className="input bg-white text-black" type="text" value={inputText} placeholder="Enter a task name" onChange={(e) => handleInputChange(e.target.value)} />
          <select className="bg-white select text-black" defaultValue="Moyenne">
            <option>Petite</option>
            <option>Moyenne</option>
            <option>Grande</option>
          </select>
          <button className="btn btn-primary bg-white btn-lg" onClick={() => addTask()}>Add task</button>
        </div>
        <div className="bg-secondary mt-5 p-4 flex justify-center items-center gap-20 w-2/3 rounded-lg">
          <ul className="ul bg-secondary w-full flex flex-col gap-2">
            <TodoItem list={taskList}/>
          </ul>
        </div>
      </div>
    </>  
  )
}

export default App
