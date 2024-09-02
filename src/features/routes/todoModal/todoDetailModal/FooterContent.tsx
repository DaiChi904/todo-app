import Button from "@/components/elements/Button";
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
            <div className="flex">
                <Button fullRounded onClick={() => handleCheck()}>
                    {todo.isChecked ? <CheckBadgeSolid /> : <CheckBadge />}
                </Button>
            </div>
            <div className="flex items-center">
                <text>
                    {todo.createdAt && !todo.lastEditAt
                        ? `Created at ${getDateString(todo.createdAt)}`
                        : `Edited at ${getDateString(todo.lastEditAt)}`}
                </text>
            </div>
            <div className="flex">
                <Button fullRounded onClick={() => setModal("editTodo")}>
                    <PencilSquare />
                </Button>
                <Button fullRounded onClick={() => handleDelete()}>
                    <Trash />
                </Button>
            </div>
        </div>
    );
}
