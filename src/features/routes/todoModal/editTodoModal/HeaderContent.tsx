import { useSetModal } from "@/hooks/useModals";
import { Todo, useEditTodo, useGetID } from "@/hooks/useTodo";

import { CalendarDays, ChevronLeft, MapPin, MapPinSolid } from "../../../../../public/HeroiconsSVGs";

export default function HeaderContent({ todo }: { todo: Todo }) {
    const setModal = useSetModal();
    const getID = useGetID();
    const updateTodo = useEditTodo();

    const pin = () => {
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
                <text className="text-3xl">Edit Todo</text>
            </div>
            <div className="ml-auto">
                <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl">
                    <CalendarDays />
                </button>
                <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl" onClick={() => pin()}>
                    {todo.isPinned ? <MapPinSolid /> : <MapPin />}
                </button>
            </div>
        </div>
    );
}
