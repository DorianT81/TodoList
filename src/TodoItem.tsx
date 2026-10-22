
type Priority = "Petite" | "Moyenne" | "Grande";

type Todo = {
  id: number;
  name: string;
  priority: Priority;
};

const priorityColors: Record<Priority, string> = {
  Petite: "bg-green-500",
  Moyenne: "bg-orange-500",
  Grande: "bg-red-500",
};

function TodoItem({ list }: { list: Todo[] }) {
  return (
    <>
      {list.map((e) => (
        <div
          className="flex flex-row gap-1 justify-start items-center w-full"
          key={e.id}
        >
          <input
            type="checkbox"
            className="checkbox checkbox-primary checkbox-xl"
          />

          <li className="bg-base-300 w-full p-3 list-none flex justify-between">
            {e.name}

            <div className={`badge ${priorityColors[e.priority]}`}>
              {e.priority}
            </div>
          </li>
        </div>
      ))}
    </>
  );
}

export default TodoItem;
