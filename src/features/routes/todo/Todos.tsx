import { useEffect, useState } from "react";

import { useSetModal } from "@/hooks/useModals";
import { Todo, useSetID, useTodos } from "@/hooks/useTodo";

export default function Todos() {
    const setModal = useSetModal();
    const [todos, setTodos] = useState<Todo[]>([]);
    const allTodos = useTodos();
    const setID = useSetID();

    useEffect(() => {
        setTodos(allTodos);
        console.log(allTodos);
    }, [allTodos]);

    const openDetailModal = (todo: Todo) => {
        setID(todo.id);
        setModal("detailTodo");
    };

    return (
        <div className="relative grid h-full grid-flow-row grid-cols-4 overflow-scroll overflow-x-hidden">
            {todos?.map((todo) => (
                <div key={todo.id} className="m-4 flex h-48 flex-col border" onClick={() => openDetailModal(todo)}>
                    <text>{todo?.title}</text>
                    <text>{todo?.content}</text>
                </div>
            ))}
        </div>
    );
}
