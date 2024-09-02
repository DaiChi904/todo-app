import { Dispatch, SetStateAction, useState } from "react";

import Button from "@/components/elements/Button";
import { useSetModal } from "@/hooks/useModals";
import { Todo, useEditTodo, useGetID } from "@/hooks/useTodo";

import { CalendarDays, ChevronLeft, MapPin, MapPinSolid } from "../../../../../public/HeroiconsSVGs";
import Calendar from "../../calendar";

interface Props {
    todo: Todo;
    begin: Date | undefined;
    setBegin: Dispatch<SetStateAction<Date | undefined>>;
    end: Date | undefined;
    setEnd: Dispatch<SetStateAction<Date | undefined>>;
}

export default function HeaderContent({ todo, begin, setBegin, end, setEnd }: Props) {
    const setModal = useSetModal();
    const getID = useGetID();
    const updateTodo = useEditTodo();

    const [useCalendar, setUseCalendar] = useState(false);
    const [isBegin, setIsBegin] = useState(false);

    const pin = () => {
        if (!todo) return;
        const pinnedTodo: Todo = { ...todo, isPinned: !todo.isPinned };
        updateTodo(getID(), pinnedTodo);
    };

    return (
        <>
            <div className="flex items-center">
                <Button fullRounded onClick={() => setModal(null)}>
                    <ChevronLeft />
                </Button>
                <div className="m-2">
                    <text className="text-3xl">Edit Todo</text>
                </div>
                <div className="ml-auto">
                    <Button fullRounded onClick={() => setUseCalendar(!useCalendar)}>
                        <CalendarDays />
                    </Button>
                    <Button fullRounded onClick={() => pin()}>
                        {todo.isPinned ? <MapPinSolid /> : <MapPin />}
                    </Button>
                </div>
            </div>

            {useCalendar && (
                <div className="absolute z-30 flex flex-col bg-white">
                    <div className="flex">
                        <Button onClick={() => setUseCalendar(!useCalendar)}>Close</Button>
                        <Button onClick={() => setIsBegin(!isBegin)}>{isBegin ? <>Begin</> : <>End</>}</Button>
                    </div>
                    {isBegin ? (
                        <div className="relative">
                            <Calendar value={begin} setValue={setBegin} />
                        </div>
                    ) : (
                        <div className="relative">
                            <Calendar value={end} setValue={setEnd} />
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
