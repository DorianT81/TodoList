type Priority = "Petite" | "Moyenne" | "Grande";

type Todo = {
    id: number,
    name: string,
    priority: Priority;
}

  

function TodoItem({ list }: { list: Todo[] }) {
    // Key needs to be at the root element of the map (here div)
    return (
        list.map((e) => (
            <div className="flex flex-row gap-1 justify-start items-center w-full" key={e.id}> 
                <input type="checkbox" className="checkbox checkbox-primary checkbox-xl"/>
                <li className="li bg-base-300 w-full p-3 list-none">{e.id + " + " + e.name}</li>
            </div>
        ))
    )
}

export default TodoItem;