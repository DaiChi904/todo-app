import { useAtom, useAtomValue } from "jotai";
import { atomWithStorage, RESET } from "jotai/vanilla/utils";

export type Todo = {
    id: string;
    title: string;
    content: string;
    isChecked: boolean;
};

const todosAtom = atomWithStorage<Todo[]>("DaiChi904::todoAtom", [], undefined, { getOnInit: true });

/**
 * Get all todos.
 */
export function useTodos(): Todo[] {
    const todos = useAtomValue<Todo[]>(todosAtom);
    return todos;
}

/**
 * Set new todo.
 * @param newTodo Todo which you want to add.
 */
export function useSetNewTodo() {
    const [todos, setTodos] = useAtom(todosAtom);
    return (newTodo: Todo) => {
        setTodos([...todos, newTodo]);
    };
}

/**
 * Initialize todosAtom.
 */
export default function useResetTodosAtom() {
    const [, setTodos] = useAtom(todosAtom);
    return () => {
        setTodos(RESET);
    };
}
