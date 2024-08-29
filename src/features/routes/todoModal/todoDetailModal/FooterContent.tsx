import { useSetModal } from "@/hooks/useModals";
import { Todo, useDeleteTodo, useEditTodo, useGetID } from "@/hooks/useTodo";
import getDateString from "@/utils/getDateString";

import { CheckBadge, CheckBadgeSolid, PencilSquare, Trash } from "../../../../../public/HeroiconsSVGs";

export default function FooterContent({ todo }: { todo: Todo }) {
    const setModal = useSetModal();
    const getID = useGetID();
    const updateTodo = useEditTodo();
    const deleteTodo = useDeleteTodo();

    const handleDelete = () => {
        deleteTodo(getID());
        setModal(null);
    };

    const handleCheck = () => {
        if (!todo) return;
        const checkedTodo: Todo = { ...todo, isChecked: !todo.isChecked };
        updateTodo(getID(), checkedTodo);
    };
    return (
        <div className="flex flex-row justify-between">
            <div id="left" className="flex">
                <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl" onClick={() => handleCheck()}>
                    {todo.isChecked ? <CheckBadgeSolid /> : <CheckBadge />}
                </button>
            </div>
            <div id="middle" className="flex items-center">
                <text>
                    {todo.createdAt && !todo.lastEditAt
                        ? `Created at ${getDateString(todo.createdAt)}`
                        : `Edited at ${getDateString(todo.lastEditAt)}`}
                </text>
            </div>
            <div id="right" className="flex">
                <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl" onClick={() => setModal("editTodo")}>
                    <PencilSquare />
                </button>
                <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl" onClick={() => handleDelete()}>
                    <Trash />
                </button>
            </div>
        </div>
    );
}
