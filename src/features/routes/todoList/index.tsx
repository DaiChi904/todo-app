import { useMemo, useState } from "react";

import { Todo, useGetIsArchived, useTodos } from "@/hooks/useTodo";

import ArchivedList from "./ArchivedList";
import NomalList from "./NomalList";

export default function TodoList() {
    const isArchived = useGetIsArchived();
    const [todos, setTodos] = useState<Todo[]>([]);
    const getAllTodos = useTodos();

    useMemo(() => {
        setTodos(getAllTodos());
    }, [getAllTodos()]);

    return !isArchived() ? <NomalList todos={todos} /> : <ArchivedList todos={todos} />;
}
