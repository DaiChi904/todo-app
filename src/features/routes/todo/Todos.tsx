import { useEffect, useState } from "react";

import { Todo, useTodos } from "@/hooks/useTodo";

export default function Todos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const allTodos = useTodos();

    useEffect(() => {
        setTodos(allTodos);
        console.log(allTodos);
    }, [allTodos]);

    return (
        <div className="relative grid h-full grid-flow-row grid-cols-4 overflow-scroll overflow-x-hidden">
            {todos?.map((todo, index) => (
                <div key={index} className="m-4 mb-10 grid grow">
                    <div className="flex h-48 flex-col border">
                        <text>{todo?.title}</text>
                        <text>{todo?.content}</text>
                    </div>
                </div>
            ))}
        </div>
    );
}
