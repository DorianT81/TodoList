type Priority = "Petite" | "Moyenne" | "Grande";

type Todo = {
    id: number,
    name: string,
    priority: Priority;
}

  

function TodoItem({ list }: { list: Todo[] }) {

    return (
        list.map((e) => (
            <li className="li bg-primary w-full p-3" key={e.id}>{e.id + " + " + e.name}</li>
        ))
    )
}

export default TodoItem;