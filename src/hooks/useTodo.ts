import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage, RESET } from "jotai/vanilla/utils";

export type CheckList = {
    id: string;
    content: string;
    isChecked: boolean;
};

export type Todo = {
    id: string;
    title: string;
    content: string;
    checkList: CheckList[];

    // The types related to date need to be reconsidered.
    begin: Date | undefined;
    end: Date | undefined;
    createdAt: Date;
    lastEditAt: Date | null;

    isChecked: boolean;
    isPinned: boolean;
    isArchived: boolean;
};

const todosAtom = atomWithStorage<Todo[]>("DaiChi904::todoAtom", [], undefined, { getOnInit: true });

export type SelectingID = string | null;

const selectingIDAtom = atom<SelectingID>(null);

/**
 * Get all todos.
 */
export function useTodos(): () => Todo[] {
    const todos = useAtomValue<Todo[]>(todosAtom);
    return () => {
        return todos;
    };
}

/**
 * Get selected todo.
 */
export function useTodo() {
    const todos = useAtomValue<Todo[]>(todosAtom);
    return (id: SelectingID): Todo | undefined => {
        const todo = todos.find((todo) => id === todo.id);
        return todo;
    };
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
 * Get selecting id of todo.
 */
export function useGetID() {
    const ID = useAtomValue<SelectingID>(selectingIDAtom);
    return (): SelectingID => {
        return ID;
    };
}

/**
 * Set id of todo for detail and edit.
 * @param id
 */
export function useSetID() {
    const setID = useSetAtom(selectingIDAtom);
    return (id: SelectingID) => {
        setID(id);
    };
}

/**
 * Delete selected todo.
 * @param id id which you want to delete.
 */
export function useDeleteTodo() {
    const [todos, setTodos] = useAtom(todosAtom);
    return (id: SelectingID) => {
        const pendingTodos = todos.filter((todo) => todo.id !== id);
        setTodos(pendingTodos);
    };
}

/**
 * Edit selected todo.
 * @param id
 * @param todo
 */
export function useEditTodo() {
    const [todos, setTodos] = useAtom(todosAtom);
    return (id: SelectingID, todo: Todo) => {
        const pendingTodos = todos.filter((todo) => todo.id !== id);
        setTodos([...pendingTodos, todo]);
    };
}

const archivedAtom = atom<boolean>(false);

/**
 *Get mode for changing todo list and archived todo list.
 */
export function useGetIsArchived(): () => boolean {
    const isArchived = useAtomValue<boolean>(archivedAtom);
    return (): boolean => {
        return isArchived;
    };
}

/**
 *Set mode for changing todo list and archived todo list.
 */
export function useArchived() {
    const setIsArchived = useSetAtom(archivedAtom);
    return (isArchived: boolean) => setIsArchived(isArchived);
}

/**
 * Initialize todosAtom.
 */
export default function useResetTodosAtom() {
    const setTodos = useSetAtom(todosAtom);
    return () => {
        setTodos(RESET);
    };
}
