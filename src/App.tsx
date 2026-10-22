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
  const [smallTaskList, setSmallTaskList] = useState<Todo[]>([]);
  const [mediumTaskList, setMediumTaskList] = useState<Todo[]>([]);
  const [largeTaskList, setLargeTaskList] = useState<Todo[]>([]);
  const [allTaskList, setAllTaskList] = useState<Todo[]>([]);
  const [smallTaskActive, setSmallTaskActive] = useState(false);
  const [mediumTaskActive, setMediumTaskActive] = useState(false);
  const [largeTaskActive, setLargeTaskActive] = useState(false);
  const [allTaskActive, setAllTaskActive] = useState(true);


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
    // Adding tasks to priority array
    switch (newTask.priority) {
      case "Petite":
        if (smallTaskList.length === 0) {
          setSmallTaskList([newTask]);
        } else {
          setSmallTaskList([...smallTaskList, newTask]);
        }
        console.log(smallTaskList);
        break;

      case "Moyenne":
        if (mediumTaskList.length === 0) {
          setMediumTaskList([newTask]);
        } else {
          setMediumTaskList([...mediumTaskList, newTask]);
        }
        break;
      case "Grande":
        if (largeTaskList.length === 0) {
          setLargeTaskList([newTask]);
        } else {
          setLargeTaskList([...largeTaskList, newTask]);
        }
        console.log(largeTaskList);
        break;

      default:
        break;
    }

    setAllTaskList([...allTaskList, newTask]);
    console.log(allTaskList);
  }

  // Delete, only for testing if priority arrays are not empty
  useEffect(() => {
          console.log(mediumTaskList)
  }, [mediumTaskList.length])
       


  function displayTasks() {
    // This function returns the array that needs to be displayed. By default it returns the full list
    if (smallTaskActive === true && mediumTaskActive === false && largeTaskActive === false && allTaskActive === false) {
      if (smallTaskList.length === 0) return [];
      return smallTaskList;
    }

    if (smallTaskActive === false && mediumTaskActive === true && largeTaskActive === false && allTaskActive === false) {
      return mediumTaskList;
    }

    if (smallTaskActive === false && mediumTaskActive === false && largeTaskActive === true && allTaskActive === false) {
      return largeTaskList;
    }

    return allTaskList;
  }

  return (
    <> 
      <div className="flex flex-col items-center justify-start pt-10 w-screen h-screen ">
        <div className="bg-primary p-4 flex justify-center items-center gap-20 w-2/3 rounded-lg">
          <input className="input bg-white text-black" type="text" value={inputText} placeholder="Enter a task name" onChange={(e) => handleInputChange(e.target.value)} />
          <select className="bg-white select text-black" defaultValue="Moyenne" onChange={(e) => setPriority(e.target.value as Priority)}> 
            <option>Petite</option>
            <option>Moyenne</option>
            <option>Grande</option>
          </select>
          <button className="btn btn-primary bg-white btn-lg" onClick={() => addTask()}>Add task</button>
        </div>

        <div className="bg-secondary w-2/3 p-2 flex flex-row gap-2">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => {
              setSmallTaskActive(true);
              setMediumTaskActive(false);
              setLargeTaskActive(false);
              setAllTaskActive(false);
            }}
          >
            Petite
          </button>

          <button
            className="btn btn-primary btn-lg"
            onClick={() => {
              setSmallTaskActive(false);
              setMediumTaskActive(true);
              setLargeTaskActive(false);
              setAllTaskActive(false);
            }}
          >
            Moyenne
          </button>

          <button
            className="btn btn-primary btn-lg"
            onClick={() => {
              setSmallTaskActive(false);
              setMediumTaskActive(false);
              setLargeTaskActive(true);
              setAllTaskActive(false);
            }}
          >
            Grande
          </button>

          <button
            className="btn btn-primary btn-lg"
            onClick={() => {
              setSmallTaskActive(false);
              setMediumTaskActive(false);
              setLargeTaskActive(false);
              setAllTaskActive(true);
            }}
          >
            Tout
          </button>
        </div>

        <div className="bg-secondary mt-5 p-4 flex flex-col justify-center items-start gap-5 w-2/3 rounded-lg">
          <TodoItem list={displayTasks()} />
        </div>
      </div>
    </>  
  )
}

export default App
