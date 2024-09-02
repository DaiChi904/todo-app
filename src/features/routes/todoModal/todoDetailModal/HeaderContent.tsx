import Button from "@/components/elements/Button";
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
            <Button fullRounded onClick={() => setModal(null)}>
                <ChevronLeft />
            </Button>
            <div className="m-2">
                <text className="text-3xl">Todo Detail</text>
            </div>
            <div className="ml-auto">
                <Button fullRounded onClick={() => handleArchive()}>
                    {todo.isArchived ? <ArrowUpTray /> : <ArchiveBoxArrowDown />}
                </Button>
                <Button fullRounded onClick={() => handlePin()}>
                    {todo.isPinned ? <MapPinSolid /> : <MapPin />}
                </Button>
            </div>
        </div>
    );
}
