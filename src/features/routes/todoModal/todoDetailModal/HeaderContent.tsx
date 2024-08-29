import { useSetModal } from "@/hooks/useModals";
import { Todo, useEditTodo, useGetID } from "@/hooks/useTodo";

import { ArchiveBoxArrowDown, ArrowUpTray, ChevronLeft, MapPin, MapPinSolid } from "../../../../../public/HeroiconsSVGs";

export default function HeaderContent({ todo }: { todo: Todo }) {
    const setModal = useSetModal();
    const getID = useGetID();
    const updateTodo = useEditTodo();

    const handleArchive = () => {
        if (!todo) return;
        const archivedTodo: Todo = { ...todo, isArchived: !todo.isArchived };
        updateTodo(getID(), archivedTodo);
        alert(todo.isArchived ? "Backuped" : "Archived");
    };

    const handlePin = () => {
        if (!todo) return;
        const pinnedTodo: Todo = { ...todo, isPinned: !todo.isPinned };
        updateTodo(getID(), pinnedTodo);
    };
    return (
        <div className="flex items-center">
            <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl" onClick={() => setModal(null)}>
                <ChevronLeft />
            </button>
            <div className="m-2">
                <text className="text-3xl">Todo Detail</text>
            </div>
            <div className="ml-auto">
                <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl" onClick={() => handleArchive()}>
                    {todo.isArchived ? <ArrowUpTray /> : <ArchiveBoxArrowDown />}
                </button>
                <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl" onClick={() => handlePin()}>
                    {todo.isPinned ? <MapPinSolid /> : <MapPin />}
                </button>
            </div>
        </div>
    );
}
